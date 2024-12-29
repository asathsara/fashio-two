import axiosInstance from "./axiosInstance";
import API_ENDPOINTS from "./Endpoints";

export const fetchImages = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.IMAGES);
  return response.data;
};

export const uploadImage = async (formData) => {
  const response = await axiosInstance.post(API_ENDPOINTS.UPLOAD_IMAGE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteImage = async (id) => {
  const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_IMAGE(id));
  return response.data;
};
