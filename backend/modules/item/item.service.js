import Item from './item.model.js';
import Category from '../category/category.model.js';

class ItemService {

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

        const item = new Item({
            images: imageObjects,
            name: itemData.name,
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
        const items = await Item.find()
            .select('-images.data')
            .populate('category', 'name subCategories');

        return items.map(item => {
            const itemObj = item.toObject();
            const subCat = itemObj.category.subCategories.find(
                sub => sub._id.toString() === itemObj.subCategory.toString()
            );
            itemObj.category = {
                _id: itemObj.category._id,
                name: itemObj.category.name,
                subCategory: subCat || { _id: itemObj.subCategory, name: 'Unknown' }
            };
            delete itemObj.subCategory;
            return itemObj;
        });
    }

    // Get one item
    async getItemById(itemId) {
        const item = await Item.findById(itemId)
            .select('-images.data')
            .populate('category', 'name subCategories');

        if (!item) throw new Error('Item not found');

        const itemObj = item.toObject();
        const subCat = itemObj.category.subCategories.find(
            sub => sub._id.toString() === itemObj.subCategory.toString()
        );
        itemObj.category = {
            _id: itemObj.category._id,
            name: itemObj.category.name,
            subCategory: subCat || { _id: itemObj.subCategory, name: 'Unknown' }
        };
        delete itemObj.subCategory;

        return itemObj;
    }

    // Get image
    async getItemImage(itemId, index) {
        const item = await Item.findById(itemId);
        if (!item) throw new Error('Item not found');

        const image = item.images[index];
        if (!image) throw new Error('Image not found');

        return image;
    }

    // Update
    async updateItem(itemId, files, itemData) {
        const item = await Item.findById(itemId);
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

        if (files && files.length > 0) {
            item.images = files.map(file => ({
                filename: file.originalname,
                data: file.buffer,
                contentType: file.mimetype,
            }));
        }

        if (itemData.name) item.name = itemData.name;
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
        const item = await Item.findByIdAndDelete(itemId);
        if (!item) throw new Error('Item not found');
    }
}

export default ItemService;
