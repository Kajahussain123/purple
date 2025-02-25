// src/pages/users/UserService.js
import { commonApi } from "../../Services/commonApi";
import { BASE_URL } from "../../Services/base_Url";

const USER_API = `${BASE_URL}/purple/users/`;

export const getUserById = async (userId) => {
  try {
    const response = await commonApi("GET", `${USER_API}${userId}/`);
    return response.data; // Expected to include an "addresses" array
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await commonApi("PATCH", `${USER_API}${userId}/`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await commonApi("GET", USER_API);
    // Assuming the API returns an object like { total_users: 13, users: [ ... ] }
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
