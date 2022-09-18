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

export const createInvoice = async (url: string | undefined, amount: number, qty: number | number[], productId: number | number[]) => {
  try {
    const result = await axios.post(`${url}xendit/create-invoice`, {
      amount: amount,
      qty: qty,
      productId: productId
    })
    
    return result;
  } catch (error) {
    return error;
  }
}

export const createVa = async (
  url: string | undefined,
  phone: string,
  bank_code: string,
  full_name: string,
  expected_amount: number,
  product_id: number[] | number,
  user: string,
  qty: number[] | number
): Promise<any> => {
  try {
    const result = await axios.post(`${url}xendit/create-va`, {
      externalID: `VA_fixed-${phone}-${Date.now()}`,
      bankCode: bank_code,
      name: full_name,
      expectedAmt: expected_amount,
      isClosed: true,
      productId: product_id,
      user: user,
      qty: qty
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
    const result = await axios.get(`${url}categories?populate=*`);

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
    const result = await axios.get(`${url}payments/${id}?populate=transaction,transaction.transaction_details,transaction.transaction_details.product`);

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

// ! cart
export const createCart = async (url: string | undefined, qty: string, price: string, profile: string, product: number) => {
  try {
    const result = await axios.post(`${url}carts`, {
      data: {
        qty,
        price,
        profile,
        product
      }
    })
    
    return result
  } catch (error) {
    return error
  }
}

export const getCart = async (url: string | undefined, profile: string) => {
  try {
    const result = await axios.get(`${url}carts?filters[profile][full_name][$eq]=${profile}&populate=product`)
    
    return result.data
  } catch (error) {
    return error
  }
}

export const deleteCart = async (url: string | undefined, id: number) => {
  try {
    const result = await axios.delete(`${url}carts/${id}`)
    
    return result.data
  } catch (error) {
    return error
  }
}
