import CategoryService from './category.service.js';

const categoryService = new CategoryService();


class CategoryController {
    // Create 
    async addCategory(req, res) {
        try {
            const category = await categoryService.createCategory(req.body.name);
            res.status(201).json(category);
        } catch (error) {
            console.error('Add category error:', error);
            res.status(500).json({ message: 'Error creating category', error: error.message });
        }
    }

    async addSubCategory(req, res) {
        try {
            const newSubItem = await categoryService.addSubCategory(req.params.id, req.body.name);
            res.status(201).send(newSubItem);
        } catch (error) {
            console.error('Add subcategory error:', error);
            if (error.message === 'Category not found') {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error creating subcategory', error: error.message });
        }
    }

    // Read
    async getAllCategories(req, res) {
        try {
            const categories = await categoryService.getAllCategories();
            res.send(categories);
        } catch (error) {
            console.error('Get categories error:', error);
            res.status(500).json({ message: 'Error fetching categories', error: error.message });
        }
    }

    // Delete
    async deleteCategory(req, res) {
        try {
            await categoryService.deleteCategory(req.params.id);
            res.status(204).send();

        } catch (error) {
            console.error('Delete category error:', error);
            if (error.message === 'Category not found') {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error deleting category', error: error.message });
        }
    }

    async deleteSubCategory(req, res) {
        try {
            const { id, subItemName } = req.params;
            const result = await categoryService.deleteSubCategory(id, subItemName);
            res.send(result);
            
        } catch (error) {
            console.error('Delete subcategory error:', error);
            if (error.message === 'Category not found' || error.message === 'Sub-item not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ message: 'Error deleting subcategory', error: error.message });
        }
    }
}

export default new CategoryController();
