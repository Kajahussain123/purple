import axios from 'axios';

export const commonApi = async (method, url, data, options = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        ...options.headers, 
      },
    });

    return response;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
