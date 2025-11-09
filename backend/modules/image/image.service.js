import Image from './image.model.js';

class ImageService {
    // Create
    async uploadImage(file) {
        if (!file) {
            throw new Error('No file uploaded');
        }

        const newImage = new Image({
            filename: file.originalname,
            data: file.buffer,
            contentType: file.mimetype,
        });

        await newImage.save();
        return {
            id: newImage._id,
            filename: newImage.filename,
            contentType: newImage.contentType,
        };
    }

    // Read
    async getAllImages() {
        const images = await Image.find().select("-data");
        return images;
    }

    async getImageById(imageId) {
        const image = await Image.findById(imageId);
        if (!image) {
            throw new Error('Image not found');
        }
        return image;
    }

    // Delete
    async deleteImage(imageId) {
        const image = await Image.findByIdAndDelete(imageId);
        if (!image) {
            throw new Error('Image not found');
        }
    }
}

export default ImageService;
