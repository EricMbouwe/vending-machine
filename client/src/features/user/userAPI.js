import axios from 'axios';

export const fetchUser = async () => {
  try {
    const { data } = await axios.get('/auth/user');
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const register = async (credentials) => {
  try {
    const { data } = await axios.post('/auth/register', credentials);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (credentials) => {
  try {
    const { data } = await axios.post('/auth/login', credentials);
    return data;    
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    await axios.delete('/auth/logout');
  } catch (error) {
    console.error(error);
  }
};
