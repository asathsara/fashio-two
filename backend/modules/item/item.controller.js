import ItemService from './item.service.js';
import { validationResult } from 'express-validator';

const itemService = new ItemService();

class ItemController {

    // Create
    async addItem(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const item = await itemService.createItem(req.files, req.body);
            res.status(201).json(item);
        } catch (error) {
            console.error('Add item error:', error);

            if ([
                'At least one image is required',
                'Category not found',
                'Subcategory not found'
            ].includes(error.message)) {
                return res.status(400).json({ message: error.message });
            }

            res.status(500).json({ message: 'Failed to add item', error: error.message });
        }
    }

    // Read all
    async getAllItems(req, res) {
        try {
            const items = await itemService.getAllItems();
            res.status(200).json(items);
        } catch (error) {
            console.error('Get items error:', error);
            res.status(500).json({ message: 'Failed to fetch items', error: error.message });
        }
    }

    // Read one
    async getItemById(req, res) {
        try {
            const item = await itemService.getItemById(req.params.id);
            res.status(200).json(item);
        } catch (error) {
            console.error('Get item error:', error);
            if (error.message === 'Item not found') {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: 'Failed to fetch item', error: error.message });
        }
    }

    // Image serving
    async getItemImage(req, res) {
        try {
            const { itemId, index } = req.params;
            const image = await itemService.getItemImage(itemId, index);

            res.set("Content-Type", image.contentType);
            res.send(image.data);

        } catch (error) {
            console.error('Get item image error:', error);

            if (['Item not found', 'Image not found'].includes(error.message)) {
                return res.status(404).json({ message: error.message });
            }

            res.status(500).json({ message: 'Error fetching image', error: error.message });
        }
    }

    // Update
    async updateItem(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const item = await itemService.updateItem(req.params.id, req.files, req.body);
            res.status(200).json(item);
        } catch (error) {
            console.error('Update item error:', error);

            if ([
                'Item not found',
                'Category not found',
                'Subcategory not found',
                'At least one image is required'
            ].includes(error.message)) {
                return res.status(400).json({ message: error.message });
            }

            res.status(500).json({ message: 'Failed to update item', error: error.message });
        }
    }

    // Delete
    async deleteItem(req, res) {
        try {
            await itemService.deleteItem(req.params.id);
            res.status(204).send();

        } catch (error) {
            console.error('Delete item error:', error);

            if (error.message === 'Item not found') {
                return res.status(404).json({ message: error.message });
            }

            res.status(500).json({ message: 'Failed to delete item', error: error.message });
        }
    }
}

export default new ItemController();
