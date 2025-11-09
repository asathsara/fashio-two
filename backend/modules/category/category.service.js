import Category from './category.model.js';

class CategoryService {
    // Create
    async createCategory(name) {
        const category = new Category({ name, subCategories: [] });
        await category.save();
        return category;
    }

    async addSubCategory(categoryId, subCategoryName) {
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }

        const newSubItem = { name: subCategoryName };
        category.subCategories.push(newSubItem);
        await category.save();

        return newSubItem;
    }

    // Read
    async getAllCategories() {
        const categories = await Category.find();
        return categories;
    }

    async getCategoryById(categoryId) {
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    }

    // Delete 
    async deleteCategory(categoryId) {
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }
        
    }

    async deleteSubCategory(categoryId, subItemIdentifier) {
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }

        const initialLength = category.subCategories.length;

        // Remove by _id or by name
        category.subCategories = category.subCategories.filter(
            (subItem) => subItem._id.toString() !== subItemIdentifier && subItem.name !== subItemIdentifier
        );

        if (category.subCategories.length === initialLength) {
            throw new Error('Sub-item not found');
        }

        await category.save();
        return { message: 'Sub-item deleted successfully', subCategories: category.subCategories };
    }
}

export default CategoryService;
