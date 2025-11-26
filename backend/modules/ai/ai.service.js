import { GoogleGenAI } from "@google/genai";
import Category from "../category/category.model.js";

class AIService {
    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            console.warn("Warning: GEMINI_API_KEY not found in environment variables");
        }

        // Initialize GoogleGenAI client with API key
        this.ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY || "",
        });
    }

    /**
     * Generate product description using Gemini AI
     * @param {Object} productData - Product information
     * @param {string} productData.title - Product title/name
     * @param {number} productData.price - Product price
     * @param {string} productData.categoryId - Category ID
     * @param {string} productData.subCategoryId - SubCategory ID
     * @param {Buffer} productData.imageBuffer - First image buffer (optional)
     * @param {string} productData.imageMimeType - Image MIME type (optional)
     * @returns {Promise<string>} Generated description
     */
    async generateProductDescription(productData) {
        try {
            const { title, price, categoryId, subCategoryId, imageBuffer, imageMimeType } = productData;

            // Validate required fields
            if (!title || !price || !categoryId || !subCategoryId) {
                throw new Error(
                    "Missing required fields: title, price, categoryId, and subCategoryId are required"
                );
            }

            // Fetch category and subcategory names
            const category = await Category.findById(categoryId);
            if (!category) throw new Error("Category not found");

            const subCategory = category.subCategories.id(subCategoryId);
            if (!subCategory) throw new Error("Subcategory not found");

            const categoryName = category.name;
            const subCategoryName = subCategory.name;

            let prompt = `You are a professional copywriter. Generate a natural, plain-text product description for the following product:

Title: ${title}
Category: ${categoryName} / ${subCategoryName}

Write 2-3 paragraphs that describe the product clearly and engagingly. Do not include price, markdown, HTML, bold text, or category labels. Focus only on the product's features, style, and use. Keep it human-readable and concise.`;


            // Build contents array for Gemini
            const contents = [];

            if (imageBuffer && imageMimeType) {
                contents.push({
                    inlineData: {
                        mimeType: imageMimeType,
                        data: imageBuffer.toString("base64"),
                    },
                });
            }

            // Add text prompt after image (or first if no image)
            contents.push({
                text: prompt,
            });

            const response = await this.ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents,
            });

            return response.text;

        } catch (error) {
            console.error("AI Service Error:", error);
            throw error;
        }
    }

}

export default AIService;
