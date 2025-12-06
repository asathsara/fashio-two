type Id = string

const API_ENDPOINTS = {
  IMAGES: "/images",
  UPLOAD_IMAGE: "/images/uploads",
  DELETE_IMAGE: (id: Id) => `/images/${id}`,

  CATEGORIES: "/categories",
  ADD_CATEGORIES: "/categories/add",
  DELETE_CATEGORY: (id: Id) => `/categories/${id}`,
  ADD_SUBCATEGORY: (id: Id) => `/categories/${id}/sub-categories`,
  DELETE_SUBCATEGORY: (
    categoryId: string,
    subItemName: string
  ) =>
    `/categories/${categoryId}/sub-categories/${subItemName}`,

  ITEMS: '/items',
  ADD_ITEMS: '/items/add',
  GET_ITEM: (id: Id) => `/items/${id}`,
  GET_ITEM_BY_SLUG: (slug: string) => `/items/slug/${slug}`,
  UPDATE_ITEM: (id: Id) => `/items/${id}`,
  DELETE_ITEM: (id: Id) => `/items/${id}`,

  PROMOS: '/promos',
  ADD_PROMOS: '/promos/add',
  DELETE_PROMO: (id: Id) => `/promos/${id}`,
  UPDATE_PROMO: (id: Id) => `/promos/${id}`,
  PROMO_STATUS: (id: Id) => `/promos/${id}/status`,

  ORDERS: '/orders',
  ORDER_CHECKOUT: '/orders/checkout',
  ORDER_ME: '/orders/me',
  ORDER_DETAIL: (id: Id) => `/orders/${id}`,
  ORDER_ADMIN: '/orders/admin',
  ORDER_ADMIN_STATS: '/orders/admin/stats',
  ORDER_STATUS: (id: Id) => `/orders/${id}/status`,
  ORDER_CANCEL: (id: Id) => `/orders/cancel/${id}`,

  AI_GENERATE_DESCRIPTION: '/ai/generate-description',

};

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  GOOGLE_LOGIN: '/auth/google',
  LOGOUT: '/auth/logout',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  RESEND_VERIFICATION: '/auth/resend-verification',
  ME: '/auth/me',
  UPDATE_PROFILE: '/auth/profile',
  CHANGE_PASSWORD: '/auth/change-password',
  ADMIN_USERS: '/auth/admin/users',
  ADMIN_UPDATE_USER_ROLE: (userId: Id) => `/auth/admin/users/${userId}/role`,
  ADMIN_DELETE_USER: (userId: Id) => `/auth/admin/users/${userId}`,
};

export default API_ENDPOINTS;
