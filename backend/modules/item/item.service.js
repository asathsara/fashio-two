import Item from './item.model.js';
import Category from '../category/category.model.js';


class ItemService {

    async createItem(files, itemData) {
        if (!files || files.length === 0) {
            throw new Error('At least one image is required');
        }

        // Validate category exists
        const category = await Category.findById(itemData.category);
        if (!category) {
            throw new Error('Category not found');
        }

        // Validate subcategory exists within the category
        const subCategory = category.subCategories.id(itemData.subCategory);
        if (!subCategory) {
            throw new Error('Subcategory not found in the selected category');
        }

        // Map uploaded files into objects for MongoDB
        const imageObjects = files.map(file => ({
            filename: file.originalname,
            data: file.buffer,
            contentType: file.mimetype,
        }));

        // Create new Item
        const item = new Item({
            images: imageObjects,
            name: itemData.name,
            price: itemData.price,
            stock: itemData.stock,
            category: itemData.category,
            subCategory: subCategory._id,
            sizes: itemData.sizes,
            description: itemData.description,
        });

        await item.save();
        return item;
    }

    // Read
    async getAllItems() {
        const items = await Item.find()
            .select("-images.data")
            .populate('category', 'name subCategories')
            .populate('subCategory', 'name');
        return items;
    }

    async getItemById(itemId) {
        const item = await Item.findById(itemId)
            .select("-images.data")
            .populate('category', 'name subCategories')
            .populate('subCategory', 'name');

        if (!item) {
            throw new Error('Item not found');
        }
        return item;
    }

    async getItemImage(itemId, index) {
        const item = await Item.findById(itemId);
        if (!item) {
            throw new Error('Item not found');
        }

        const image = item.images[index];
        if (!image) {
            throw new Error('Image not found');
        }

        return image;
    }

    // Update
    async updateItem(itemId, files, itemData) {
        const item = await Item.findById(itemId);
        if (!item) {
            throw new Error('Item not found');
        }

        // Validate category if provided
        if (itemData.category) {
            const category = await Category.findById(itemData.category);
            if (!category) {
                throw new Error('Category not found');
            }

            // Validate subcategory if provided
            if (itemData.subCategory) {
                const subCategory = category.subCategories.id(itemData.subCategory);
                if (!subCategory) {
                    throw new Error('Subcategory not found in the selected category');
                }
                item.subCategory = subCategory._id;
            }
            item.category = itemData.category;
        }

        // Update images if new ones are provided
        if (files && files.length > 0) {
            const imageObjects = files.map(file => ({
                filename: file.originalname,
                data: file.buffer,
                contentType: file.mimetype,
            }));
            item.images = imageObjects;
        }

        // Update other fields
        if (itemData.name) item.name = itemData.name;
        if (itemData.price) item.price = itemData.price;
        if (itemData.stock !== undefined) item.stock = itemData.stock;
        if (itemData.sizes) item.sizes = itemData.sizes;
        if (itemData.description !== undefined) item.description = itemData.description;

        await item.save();
        return item;
    }

    // Delete
    async deleteItem(itemId) {
        const item = await Item.findByIdAndDelete(itemId);
        if (!item) {
            throw new Error('Item not found');
        }
    }
}

export default ItemService;
