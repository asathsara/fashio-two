/**
 * Auth Module
 * Entry point for the authentication module
 * Exports all auth-related components
 */

import authRoutes from './auth.routes.js';
import authController from './auth.controller.js';
import AuthService from './auth.service.js';
import User from './auth.model.js';

export {
    authRoutes,
    authController,
    AuthService,
    User
};

export default authRoutes;
