import Category from './category.model.js';
import Item from '../item/item.model.js';

const buildUsageError = (message) => {
    const error = new Error(message);
    error.statusCode = 400;
    return error;
};

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

        // Check for duplicate subcategory name
        const exists = category.subCategories.some(sub => sub.name === subCategoryName);
        if (exists) {
            throw new Error('Subcategory with this name already exists');
        }

        const newSubItem = { name: subCategoryName };
        category.subCategories.push(newSubItem);
        await category.save();

        return newSubItem;
    }

    // Read
    async getAllCategories() {
        const categories = await Category.find();
        const categoryIds = categories.map((category) => category._id);

        if (categoryIds.length === 0) {
            return categories;
        }

        // Load lightweight item references to know which categories/subcategories are in use
        const items = await Item.find({ category: { $in: categoryIds } })
            .select('category subCategory');

        const categoryUsageMap = new Map();
        const subCategoryUsageMap = new Map();

        items.forEach((item) => {
            const catKey = item.category?.toString();
            if (catKey) {
                categoryUsageMap.set(catKey, true);
            }

            if (catKey && item.subCategory) {
                const subKey = `${catKey}_${item.subCategory.toString()}`;
                subCategoryUsageMap.set(subKey, true);
            }
        });

        return categories.map((category) => {
            const categoryObj = category.toObject();
            const catKey = categoryObj._id.toString();

            categoryObj.hasAssignedItems = Boolean(categoryUsageMap.get(catKey));
            categoryObj.subCategories = categoryObj.subCategories?.map((subCategory) => {
                const subKey = `${catKey}_${subCategory._id.toString()}`;
                return {
                    ...subCategory,
                    hasAssignedItems: Boolean(subCategoryUsageMap.get(subKey)),
                };
            }) ?? [];

            return categoryObj;
        });
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
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }

        const categoryInUse = await Item.exists({ category: categoryId });
        if (categoryInUse) {
            throw buildUsageError('Cannot delete category while items are assigned to it');
        }

        await Category.findByIdAndDelete(categoryId);
    }

    async deleteSubCategory(categoryId, subItemIdentifier) {
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }

        const subCategory = category.subCategories.id(subItemIdentifier) ??
            category.subCategories.find((subItem) => subItem.name === subItemIdentifier);

        if (!subCategory) {
            throw new Error('Sub-item not found');
        }

        const subCategoryInUse = await Item.exists({
            category: categoryId,
            subCategory: subCategory._id,
        });

        if (subCategoryInUse) {
            throw buildUsageError('Cannot delete subcategory while items are assigned to it');
        }

        category.subCategories.id(subCategory._id)?.deleteOne();
        await category.save();
        return { message: 'Sub-item deleted successfully', subCategories: category.subCategories };
    }
}

export default CategoryService;
