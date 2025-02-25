import { BASE_URL } from "./base_Url";
import { commonApi } from "./commonApi";
import axios from "axios"; // Ensure axios is imported

// View Vendors
export const viewVendors = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/vendor/vendors/`);
        return response.data;
    } catch (error) {
        console.error("Failed to view vendors:", error);
        throw error;
    }
};

// Accept or Reject Vendor
export const acceptReject = async (id, reqBody) => {
    try {
        const response = await axios.put(`${BASE_URL}/vendor/vendor-accept-reject/${id}/`, reqBody);
        return response.data;
    } catch (error) {
        console.error("Failed to update vendor status:", error);
        throw error;
    }
};

// Edit Vendor
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

// Vendor Products
export const vendorProducts = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/productsapp/vendors/${id}/products/`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch vendor products:", error);
        throw error;
    }
};

// Vendor Categories
export const vendorCategories = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/productsapp/vendors/${id}/categories/`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch vendor categories:", error);
        throw error;
    }
};

// Enable/Disable Vendor
export const enableDisableVendor = async (id, reqBody) => {
    try {
        const response = await axios.patch(`${BASE_URL}/vendor/vendor-enable-disable/${id}/`, reqBody);
        return response.data;
    } catch (error) {
        console.error("Failed to update vendor status:", error);
        throw error;
    }
};

// Get Carousel Images
export const getCarouselImages = async () => {
    return await commonApi("GET", `${BASE_URL}/purple/carousel/`);
};

// Add Carousel Image
export const addCarouselImage = async (data) => {
    return await commonApi("POST", `${BASE_URL}/purple/carousel/`, data);
};

// Update Carousel Image
export const updateCarouselImage = async (id, data) => {
    return await commonApi("PUT", `${BASE_URL}/purple/carousel/${id}/`, data);
};

// Delete Carousel Image
export const deleteCarouselImage = async (id) => {
    return await commonApi("DELETE", `${BASE_URL}/purple/carousel/${id}/`);
};

// Orders Count
export const ordersCount = async () => {
    return await commonApi("GET", `${BASE_URL}/productsapp/orders/`);
};

// Vendors Count
export const vendorsCount = async () => {
    return await commonApi("GET", `${BASE_URL}/vendor/vendors/`);
};

// Users Count
export const usersCount = async () => {
    return await commonApi("GET", `${BASE_URL}/purple/users/`);
};
