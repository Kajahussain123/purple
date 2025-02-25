import { BASE_URL } from "./base_Url";
import { commonApi } from "./commonApi";

export const getCarouselImages = async () => {
  return await commonApi("GET", `${BASE_URL}/purple/carousel/`);
};

export const addCarouselImage = async (data) => {
  return await commonApi("POST", `${BASE_URL}/purple/carousel/`, data);
};

export const updateCarouselImage = async (id, data) => {
  return await commonApi("PUT", `${BASE_URL}/purple/carousel/${id}/`, data);
};

export const deleteCarouselImage = async (id) => {
  return await commonApi("DELETE", `${BASE_URL}/purple/carousel/${id}/`);
};
export const ordersCount = async () => {
    return await commonApi("GET", `${BASE_URL}/productsapp/orders/`);
  };

  export const vendorsCount = async () => {
    return await commonApi("GET", `${BASE_URL}/vendor/vendors/`);
  };
  export const usersCount = async () => {
    return await commonApi("GET", `${BASE_URL}/purple/users/`);
  };