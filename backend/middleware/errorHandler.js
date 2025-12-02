import logger from '../config/logger.js';

export function errorHandler(err, req, res, next) {
    logger.error(
        {
            message: err.message,
            stack: err.stack,
            route: req.originalUrl,
        },
        'Unhandled backend error'
    );

    const statusCode = err.status || 500;
    const responseMessage = err.message || 'Server error';

    res.status(statusCode).json({ message: responseMessage });
}
