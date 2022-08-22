import axios from 'axios';

// ! auth
export const authLogin = async (url: string | undefined, body: {}) => {
  try {
    const result = await axios.post(`${url}auth/local`, body);

    return result;
  } catch (error) {
    return error;
  }
};

export const authSignUp = async (url: string | undefined, body: {}) => {
  try {
    const result = await axios.post(`${url}auth/local/register`, body);

    return result;
  } catch (error) {
    return error;
  }
};

// ! categories
export const getCategories = async (url: string | undefined) => {
  try {
    const result = await axios.get(`${url}categories`);

    return result;
  } catch (error) {
    return error;
  }
};

// ! products
export const findProducts = async (url: string | undefined) => {
  try {
    const result = await axios.get(`${url}products?populate=image`);

    return result;
  } catch (error) {
    return error;
  }
};

export const findProductDetail = async (url: string | undefined, slug: string | undefined | string[]) => {
  try {
    const result = await axios.get(`${url}products?filters[slug][$eq]=${slug}&populate=image`);

    return result;
  } catch (error) {
    return error;
  }
};

export const findProductByCategory = async (url: string | undefined, category: string | undefined | string[]) => {
  try {
    const result = await axios.get(`${url}products?filters[category][name][$eq]=${category}&populate=image`);

    return result;
  } catch (error) {
    return error;
  }
};
