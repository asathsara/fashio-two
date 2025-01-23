import axiosInstance from "./axiosInstance";
import API_ENDPOINTS from "./Endpoints";

export const fetchPromos = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.PROMOS);
  return response.data;
};

export const insertPromo = async (promo) => {
  const response = await axiosInstance.post(API_ENDPOINTS.ADD_PROMOS, promo);
  return response.data;
};

export const deletePromo = async(id) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_PROMO(id));
    return response.data;
}
