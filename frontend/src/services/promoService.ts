import type { Promo } from "../types/promo";
import axiosInstance from "./api";
import API_ENDPOINTS from "./endpoints";

export const fetchPromos = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.PROMOS);
  return response.data;
};

export const insertPromo = async (promo: Omit<Promo, "_id">): Promise<Promo> => {
  const response = await axiosInstance.post(API_ENDPOINTS.ADD_PROMOS, promo);
  return response.data;
};

export const deletePromo = async (id: string): Promise<void> => {
  await axiosInstance.delete(API_ENDPOINTS.DELETE_PROMO(id));
}

export const updatePromo = async (id: string, promo: Omit<Promo, "_id">): Promise<Promo> => {
  const response = await axiosInstance.put(API_ENDPOINTS.UPDATE_PROMO(id), promo);
  return response.data;
};

export const updatePromoStatus = async (id: string, isPaused: boolean): Promise<Promo> => {
  const response = await axiosInstance.patch(API_ENDPOINTS.PROMO_STATUS(id), { isPaused });
  return response.data;
};
