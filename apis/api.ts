import axios from 'axios';

// ! xendit
export const getVa = async (url: string | undefined) => {
  try {
    const result = await axios.get(`${url}xendit/get-va`);

    return result.data;
  } catch (error) {
    return error;
  }
};

export const createVa = async (
  url: string | undefined,
  phone: string,
  bank_code: string,
  full_name: string,
  expected_amount: number,
  // time: Date,
  product_id: number,
  user: string
): Promise<any> => {
  try {
    const result = await axios.post(`${url}xendit/create-va`, {
      externalID: `VA_fixed-${phone}-${Date.now()}`,
      bankCode: bank_code,
      name: full_name,
      expectedAmt: expected_amount,
      isClosed: true,
      // expirationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      productId: product_id,
      user: user,
    });

    return result;
  } catch (error) {
    return error;
  }
};

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
    const result = await axios.post(`${url}profile/register-user`, body);

    return result;
  } catch (error) {
    return error;
  }
};

// ! profile
export const getProfile = async (url: string | undefined, token: string, username: string) => {
  try {
    const result = await axios.get(`${url}profiles?filters[full_name][$eq]=${username}&populate=*`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return result;
  } catch (error) {
    return error;
  }
};

export const updateProfile = async (url: string | undefined, token: string, id: string, body: any) => {
  try {
    const result = await axios.put(
      `${url}profiles/${id}`,
      { data: body[0] },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
    const result = await axios.get(`${url}products?populate=image&sort[0]=id:desc&pagination[limit]=12`);

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

// ! payment
export const getPaymentByID = async (url: string | undefined, id: string | string[] | undefined): Promise<any> => {
  try {
    const result = await axios.get(`${url}payments/${id}`);

    return result;
  } catch (error) {
    return error;
  }
};

export const getPaymentByProfile = async (url: string | undefined, username: string): Promise<any> => {
  try {
    const result = await axios.get(
      `${url}transactions?filters[profile][full_name][$eq]=${username}&populate=payment,profile`
    );

    return result;
  } catch (error) {
    return error;
  }
};
