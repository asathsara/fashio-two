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
  DELETE_ITEM: (id: Id) => `/items/${id}`,

  PROMOS: '/promos',
  ADD_PROMOS: '/promos/add',
  DELETE_PROMO: (id: Id) => `/promos/${id}`,

};

export default API_ENDPOINTS;
