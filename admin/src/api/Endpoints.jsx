const API_ENDPOINTS = {
  IMAGES: "/images",
  UPLOAD_IMAGE: "/images/uploads",
  DELETE_IMAGE: (id) => `/images/${id}`,

  CATEGORIES: "/categories",
  ADD_CATEGORIES: "/categories/add",
  DELETE_CATEGORY: (id) => `/categories/${id}`,
  ADD_SUBCATEGORY: (id) => `/categories/${id}/sub-categories`,
  DELETE_SUBCATEGORY: (categoryId, subItemName) =>
    `/categories/${categoryId}/sub-categories/${subItemName}`,

  ITEMS: '/items',
  ADD_ITEMS: '/items/add',

};

export default API_ENDPOINTS;
