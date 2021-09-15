import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get('/api/products');
    return data;
  } catch (error) {
    console.error(error);
  }
};
