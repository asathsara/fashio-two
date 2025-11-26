import rateLimit from 'express-rate-limit';


// Rate limiter for AI generation endpoints
// Very strict limit due to external API costs and processing time
const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window per user
    message: {
        success: false,
        message: 'Too many AI generation requests. Please try again in 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false, 
    keyGenerator: (req) => {
        return req.user?.id || req.ip;
    },
});


// Rate limiter for authentication endpoints (login, register, password reset)
// Prevents brute force attacks and account enumeration
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window per IP
    message: {
        success: false,
        message: 'Too many authentication attempts. Please try again in 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false, // Count successful requests
});


// Rate limiter for email-related endpoints (verification, resend)
// Prevents email spam and abuse
const emailLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 requests per hour
    message: {
        success: false,
        message: 'Too many email requests. Please try again in an hour.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return req.user?.id || req.ip;
    },
});


// Rate limiter for file upload endpoints
// Prevents storage abuse and excessive bandwidth usage
const uploadLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // 20 uploads per hour
    message: {
        success: false,
        message: 'Too many upload requests. Please try again in an hour.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return req.user?.id || req.ip;
    },
});

// Rate limiter for public API endpoints (GET requests)
// Prevents excessive data scraping while allowing normal usage
const publicApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window per IP
    message: {
        success: false,
        message: 'Too many requests. Please try again in 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});


// Rate limiter for admin API endpoints (write operations)
// Protects admin operations while allowing reasonable usage
const adminApiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 30, // 30 requests per hour
    message: {
        success: false,
        message: 'Too many admin requests. Please try again in an hour.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return req.user?.id || req.ip;
    },
});

// General rate limiter for all endpoints
// Acts as a baseline protection against DoS attacks
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window per IP
    message: {
        success: false,
        message: 'Too many requests from this IP. Please try again in 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    aiLimiter,
    authLimiter,
    emailLimiter,
    uploadLimiter,
    publicApiLimiter,
    adminApiLimiter,
    generalLimiter,
};
