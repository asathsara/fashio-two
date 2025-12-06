import Item from './item.model.js';
import Category from '../category/category.model.js';
import PromoService from '../promo/promo.service.js';
import Cart from '../cart/cart.model.js';
import slugify from 'slugify';

class ItemService {
    constructor() {
        this.promoService = new PromoService();
    }

    async buildItemResponse(item) {

        try {
            // Defensive: ensure toObject exists and works
            let itemObj;
            if (item && typeof item.toObject === 'function') {
                itemObj = item.toObject();
            } else if (item && typeof item === 'object') {
                itemObj = { ...item };
            } else {
                throw new Error('Invalid item provided');
            }

            const categoryObj = itemObj.category && typeof itemObj.category === 'object' ? itemObj.category : null;
            const subCategories = Array.isArray(categoryObj?.subCategories) ? categoryObj.subCategories : [];

            const subCat = subCategories.find(
                sub => sub?._id && itemObj.subCategory && sub._id.toString() === itemObj.subCategory.toString()
            );

            itemObj.category = categoryObj
                ? {
                    _id: categoryObj._id,
                    name: categoryObj.name,
                    subCategory: subCat || (itemObj.subCategory ? { _id: itemObj.subCategory, name: 'Unknown' } : null)
                }
                : null;

            delete itemObj.subCategory;

            const pricingInfo = await this.promoService.getItemPricing(itemObj._id, itemObj.price);

            return {
                ...itemObj,
                ...pricingInfo
            };
        } catch (err) {
            throw new Error('Failed to build item response: ' + err.message);
        }
    }

    // Create
    async createItem(files, itemData) {
        if (!files || files.length === 0) throw new Error('At least one image is required');

        // Find category
        const category = await Category.findById(itemData.category);
        if (!category) throw new Error('Category not found');

        // Find subcategory inside category
        const subCategory = category.subCategories.id(itemData.subCategory);
        if (!subCategory) throw new Error('Subcategory not found in the selected category');

        // Map images
        const imageObjects = files.map(file => ({
            filename: file.originalname,
            data: file.buffer,
            contentType: file.mimetype,
        }));

        // Parse sizes if it's a JSON string
        const sizes = typeof itemData.sizes === 'string' ? JSON.parse(itemData.sizes) : itemData.sizes;

        const slug = slugify(itemData.name, { lower: true, strict: true });

        const item = new Item({
            images: imageObjects,
            name: itemData.name,
            slug: slug,
            price: itemData.price,
            stock: itemData.stock,
            category: category._id,
            subCategory: subCategory._id,
            sizes: sizes,
            description: itemData.description,
        });

        await item.save();
        return item;
    }

    // Read all items
    async getAllItems() {
        const items = await Item.find({ isDeleted: { $ne: true } })
            .select('-images.data')
            .populate('category', 'name subCategories');

        const itemsWithPromo = await Promise.all(items.map(async (item) => this.buildItemResponse(item)));

        return itemsWithPromo;
    }

    // Get one item by ID
    async getItemById(itemId) {
        const item = await Item.findOne({ _id: itemId, isDeleted: { $ne: true } })
            .select('-images.data')
            .populate('category', 'name subCategories');

        if (!item) throw new Error('Item not found');
        return this.buildItemResponse(item);
    }

    // Get one item by Slug
    async getItemBySlug(slug) {
        const item = await Item.findOne({ slug: slug, isDeleted: { $ne: true } })
            .select('-images.data')
            .populate('category', 'name subCategories');

        if (!item) throw new Error('Item not found');
        return this.buildItemResponse(item);
    }

    // Get image
    async getItemImage(itemId, index) {
        const item = await Item.findOne({ _id: itemId, isDeleted: { $ne: true } });
        if (!item) throw new Error('Item not found');

        const image = item.images[index];
        if (!image) throw new Error('Image not found');

        return image;
    }

    // Update
    async updateItem(itemId, files, itemData) {
        const item = await Item.findOne({ _id: itemId, isDeleted: { $ne: true } });
        if (!item) throw new Error('Item not found');

        if (itemData.category) {
            const category = await Category.findById(itemData.category);
            if (!category) throw new Error('Category not found');
            item.category = category._id;

            if (itemData.subCategory) {
                const subCategory = category.subCategories.id(itemData.subCategory);
                if (!subCategory) throw new Error('Subcategory not found in the selected category');
                item.subCategory = subCategory._id;
            }
        }

        // Handle image updates with remainingImages
        const remainingImages = itemData.remainingImages
            ? JSON.parse(itemData.remainingImages)
            : [];

        // Keep only the existing images that are in remainingImages array
        const keptImages = item.images.filter((_, index) =>
            remainingImages.includes(index)
        );

        // Map new uploaded files to image objects
        const newImageObjects = files && files.length > 0
            ? files.map(file => ({
                filename: file.originalname,
                data: file.buffer,
                contentType: file.mimetype,
            }))
            : [];

        // Merge kept images with new uploads
        item.images = [...keptImages, ...newImageObjects];

        // Validate that at least one image exists
        if (item.images.length === 0) {
            throw new Error('At least one image is required');
        }

        if (itemData.name) {
            item.name = itemData.name;
            item.slug = slugify(itemData.name, { lower: true, strict: true });
        }
        if (itemData.price) item.price = itemData.price;
        if (itemData.stock !== undefined) item.stock = itemData.stock;
        if (itemData.sizes) {
            item.sizes = typeof itemData.sizes === 'string' ? JSON.parse(itemData.sizes) : itemData.sizes;
        }
        if (itemData.description !== undefined) item.description = itemData.description;

        await item.save();
        return item;
    }

    // Delete
    async deleteItem(itemId) {
        const item = await Item.findById(itemId);
        if (!item || item.isDeleted) throw new Error('Item not found');

        item.isDeleted = true;
        item.deletedAt = new Date();
        await item.save();

        await Promise.all([
            Cart.updateMany(
                { 'items.item': item._id },
                { $pull: { items: { item: item._id } } }
            ),
            this.promoService.archivePromosForItem(item._id)
        ]);
    }
}

export default ItemService;
