import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get('/api/products');
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSellerProducts = async (sellerId) => {
  try {
    const { data } = await axios.get('/api/products/seller/' + sellerId);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSingleProduct = async (productId) => {
  try {
    const { data } = await axios.get('/api/products/' + productId);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createProduct = async (body) => {
  try {
    const { data } = await axios.post('/api/products/', body);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (body) => {
  try {
    const { productId } = body;
    const { data } = await axios.put(`/api/products/${productId}`, body);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const { data } = await axios.delete('/api/products/' + productId);
    return data;
  } catch (error) {
    console.error(error);
  }
};
