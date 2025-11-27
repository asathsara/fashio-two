import rateLimit, { ipKeyGenerator } from "express-rate-limit";

const userOrIpKeyGen = (req) => req.user?.id || ipKeyGenerator(req);

const createLimiter = (options) =>
  rateLimit({
    standardHeaders: true,
    legacyHeaders: false,
    ...options,
  });

export const aiLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  keyGenerator: userOrIpKeyGen,
  message: {
    success: false,
    message: "Too many AI requests. Please try again in 15 minutes.",
  },
});

export const authLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Try again in 15 minutes.",
  },
});

export const emailLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 3,
  keyGenerator: userOrIpKeyGen,
  message: {
    success: false,
    message: "Too many email actions. Try again in 1 hour.",
  },
});

export const uploadLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 20,
  keyGenerator: userOrIpKeyGen,
  message: {
    success: false,
    message: "Too many uploads. Please retry in 1 hour.",
  },
});

export const publicApiLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Try again in 15 minutes.",
  },
});

export const adminApiLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 30,
  keyGenerator: userOrIpKeyGen,
  message: {
    success: false,
    message: "Too many admin actions. Try again in 1 hour.",
  },
});

export const generalLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests from this IP. Retry in 15 minutes.",
  },
});
