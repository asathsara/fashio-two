import ImageService from './image.service.js';

const imageService = new ImageService();


class ImageController {
    // Create
    async uploadImage(req, res) {
        try {
            const result = await imageService.uploadImage(req.file);
            res.json(result);
        } catch (error) {
            console.error('Upload image error:', error);
            if (error.message === 'No file uploaded') {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'Error uploading image' });
        }
    }

    // Read
    async getAllImages(req, res) {
        try {
            const images = await imageService.getAllImages();
            res.json(images);
        } catch (error) {
            console.error('Get images error:', error);
            res.status(500).json({ error: 'Error fetching images' });
        }
    }

    async getImageById(req, res) {
        try {
            const image = await imageService.getImageById(req.params.id);
            res.set("Content-Type", image.contentType);
            res.send(image.data);
        } catch (error) {
            console.error('Get image error:', error);
            if (error.message === 'Image not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: 'Error fetching image' });
        }
    }

    // Delete
    async deleteImage(req, res) {
        try {
            const result = await imageService.deleteImage(req.params.id);
            res.json(result);
        } catch (error) {
            console.error('Delete image error:', error);
            if (error.message === 'Image not found') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: 'Error deleting image' });
        }
    }
}

export default new ImageController();
