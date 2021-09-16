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

export const buy = async (body) => {
  try {
    const { data } = await axios.post('/api/users/buy', body);
    console.log('SLICE BUY', data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const reset = async (body) => {
  try {
    const { data } = await axios.post('/api/users/reset', body);
    console.log('SLICE RESET', data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deposit = async (body) => {
  try {
    const { data } = await axios.post('/api/users/deposit', body);
    console.log('SLICE DEPOSIT', data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
