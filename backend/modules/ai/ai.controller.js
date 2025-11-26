import AIService from './ai.service.js';

const aiService = new AIService();

class AIController {
    /**
     * Generate product description
     * POST /api/ai/generate-description
     * Body: { title, price, categoryId, subCategoryId }
     * Optional file: image (multipart/form-data)
     */
    async generateDescription(req, res) {
        try {
            const { title, price, categoryId, subCategoryId } = req.body;

            // Validate required fields
            if (!title || !price || !categoryId || !subCategoryId) {
                return res.status(400).json({
                    message: 'Missing required fields',
                    required: ['title', 'price', 'categoryId', 'subCategoryId']
                });
            }

            const productData = {
                title,
                price: parseFloat(price),
                categoryId,
                subCategoryId,
            };

            // If image is uploaded, include only the first one
            if (req.file) {
                productData.imageBuffer = req.file.buffer;
                productData.imageMimeType = req.file.mimetype;
            }

            const description = await aiService.generateProductDescription(productData);

            res.status(200).json({
                success: true,
                description: description.trim()
            });

        } catch (error) {
            console.error('Generate description error:', error);

            // Handle specific error cases
            if (error.message.includes('Missing required fields') ||
                error.message.includes('not found')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            // Handle API key issues
            if (error.message.includes('API key')) {
                return res.status(500).json({
                    success: false,
                    message: 'AI service configuration error. Please contact administrator.'
                });
            }

            res.status(500).json({
                success: false,
                message: 'Failed to generate description',
                error: error.message
            });
        }
    }
}

export default new AIController();
