import { Blob } from 'buffer';

const compressImage = async (file) => {
    const COMPRESSOR_URL = process.env.IMAGE_COMPRESSOR_URL;
    const QUALITY = process.env.IMAGE_COMPRESSOR_QUALITY || '80';
    const API_KEY = process.env.IMAGE_COMPRESSOR_API_KEY;

    // Check if compressor URL is set
    if (!COMPRESSOR_URL) {
        console.warn('IMAGE_COMPRESSOR_URL not set, skipping compression');
        return {
            buffer: file.buffer,
            mimetype: file.mimetype,
            filename: file.originalname
        };
    }

    try {
        // Prepare FormData
        const formData = new FormData();
        // Convert Buffer to Blob for fetch
        const blob = new Blob([file.buffer], { type: file.mimetype });
        formData.append('file', blob, file.originalname);

        // Construct URL
        // Remove trailing slash if present to avoid double slashes
        const baseUrl = COMPRESSOR_URL.replace(/\/$/, '');
        const url = new URL(`${baseUrl}/compress`);

        // Default settings 
        const targetFormat = 'webp';
        url.searchParams.set('quality', QUALITY);
        url.searchParams.set('format', targetFormat);

        console.log(`Compressing image via ${url.toString()}...`);

        const headers = {};
        if (API_KEY) {
            headers['x-api-key'] = API_KEY;
        }

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: headers
        });

        if (!response.ok) {
            console.error(`Compression failed with status ${response.status}: ${await response.text()}`);
            throw new Error(`Compression failed: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const compressedBuffer = Buffer.from(arrayBuffer);

        // Update filename extension
        const originalNameParts = file.originalname.split('.');
        originalNameParts.pop(); // Remove old extension
        const newFilename = `${originalNameParts.join('.')}.${targetFormat}`;

        return {
            buffer: compressedBuffer,
            mimetype: `image/${targetFormat}`,
            filename: newFilename
        };

    } catch (error) {
        console.error('Compression service error:', error);
        // Fallback to original file on error to ensure data isn't lost
        return {
            buffer: file.buffer,
            mimetype: file.mimetype,
            filename: file.originalname
        };
    }
};

export default compressImage;
