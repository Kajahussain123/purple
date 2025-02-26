import { commonApi } from "../../Services/commonApi";
import { BASE_URL } from "../../Services/base_Url";


export const updateAddress = async (addressId, addressData) => {
  try {
    const response = await commonApi("PATCH", `${BASE_URL}/purple/addresses/${addressId}/`, addressData);
    return response.data;
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
};

export const createAddress = async (addressData) => {
  try {
    const response = await commonApi("POST", `${BASE_URL}/purple/addresses/`, addressData);
    return response.data;
  } catch (error) {
    console.error("Error creating address:", error);
    throw error;
  }
};
