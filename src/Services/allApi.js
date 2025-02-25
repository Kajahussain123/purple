import axios from "axios";
import { BASE_URL } from "./base_Url";

export const viewVendors = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/vendor/vendors/`);
        return response.data;
    } catch (error) {
        console.error("Failed to view vendors:", error);
        throw error;
    }
};

export const acceptReject = async (id, reqBody) => {
    try {
        const response = await axios.put(`${BASE_URL}/vendor/vendor-accept-reject/${id}/`, reqBody);
        return response.data;
    } catch (error) {
        console.error("Failed to view vendors:", error);
        throw error;
    }
};


export const editVendor = async (id, formData) => {
    try {
        const response = await axios.patch(`${BASE_URL}/vendor/vendors/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure correct content type
            },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to update vendor:", error);
        throw error;
    }
};


export const vendorProducts = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/productsapp/vendors/${id}/products/`, {
        });
        return response.data;
    } catch (error) {
        console.error("Failed to update vendor:", error);
        throw error;
    }
};

export const vendorCategories = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/productsapp/vendors/${id}/categories/`, {
        });
        return response.data;
    } catch (error) {
        console.error("Failed to update vendor:", error);
        throw error;
    }
};

export const enableDisableVendor = async (id, reqBody) => {
    try {
        const response = await axios.patch(`${BASE_URL}/vendor/vendor-enable-disable/${id}/`, reqBody);
        return response.data;
    } catch (error) {
        console.error("Failed to view vendors:", error);
        throw error;
    }
};
