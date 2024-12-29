const API_ENDPOINTS = {
  IMAGES: "/images",
  UPLOAD_IMAGE: "/images/uploads",
  DELETE_IMAGE: (id) => `/images/${id}`,

  ADD_CATEGORIES: "/categories/add",
};

export default API_ENDPOINTS;
