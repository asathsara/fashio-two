import logger from '../config/logger.js';

export function errorHandler(err, req, res, next) {
    
  // Log the full error (stack, message, route) — always log
  logger.error(
    {
      message: err.message,
      stack: err.stack,
      route: req.originalUrl,
    },
    'Unhandled backend error'
  );

  // Don't try to send response if headers already sent
  if (res.headersSent) {
    return next(err);
  }

  const isProd = process.env.NODE_ENV === 'production';
  const statusCode = err.status || 500;

  // Sanitize message in production
  const responseMessage =
    statusCode >= 500 && isProd
      ? 'Internal server error'
      : err.message || 'Server error';

  res.status(statusCode).json({ message: responseMessage });
}
