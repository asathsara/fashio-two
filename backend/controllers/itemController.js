import Item from "../models/item.js";
import Category from "../models/category.js";

// Add an item
export const addItem = async (req, res) => {
    try {
        // Check if any files were uploaded
        if (!req.files || req.files.length === 0) {
            return res
                .status(400)
                .json({ message: "At least one image is required" });
        }

        // Validate that the category exists
        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Validate that the subcategory exists within the category using the subcategory ID
        const subCategory = category.subCategories.id(req.body.subCategoryId);
        if (!subCategory) {
            return res.status(404).json({ message: "Subcategory not found in the selected category" });
        }

        // Map uploaded files into objects for MongoDB
        const imageObjects = req.files.map(file => ({
            filename: file.originalname,
            data: file.buffer,
            contentType: file.mimetype,
        }));

        // Create a new Item instance
        const item = new Item({
            images: imageObjects,
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            subCategoryId: subCategory._id,
            subCategoryName: subCategory.name,
            sizes: req.body.sizes,
            description: req.body.description,
        });

        // Save the Item to the database
        await item.save();

        // Respond with the created item
        res.status(201).json(item);
    } catch (err) {
        // Handle errors and respond appropriately
        res.status(500).json({ message: "Failed to add item", error: err.message });
    }
};

// Fetch all items
export const getAllItems = async (req, res) => {
    try {
        // Retrieve all items from the database and populate category
        const items = await Item.find()
            .select("-images.data") // Exclude image buffer data
            .populate('category', 'name subCategories'); // Populate category with name and subcategories

        // Respond with the list of items
        res.status(200).json(items);
    } catch (err) {
        // Handle errors and respond appropriately
        res
            .status(500)
            .json({ message: "Failed to fetch items", error: err.message });
    }
};

// Fetch a single item by ID
export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
            .select("-images.data") // Exclude image buffer data
            .populate('category', 'name subCategories'); // Populate category with name and subcategories

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Respond with the item
        res.status(200).json(item);
    } catch (err) {
        // Handle errors and respond appropriately
        res.status(500).json({ message: "Failed to fetch item", error: err.message });
    }
};

// Delete an item
export const deleteItem = async (req, res) => {
    try {

        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        res.status(200).json({ message: "Item deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: "Failed to delete item", error: err.message });
    }
};

// Get image by item ID and image index
export const getItemImage = async (req, res) => {
    try {
        const { itemId, index } = req.params;
        const item = await Item.findById(itemId);
        if (!item) return res.status(404).json({ message: "Item not found" });

        const image = item.images[index];
        if (!image) return res.status(404).json({ message: "Image not found" });

        res.set("Content-Type", image.contentType);
        res.send(image.data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching image", error: err.message });
    }
};
