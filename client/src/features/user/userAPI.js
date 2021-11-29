import axios from 'axios';

export const fetchUser = async () => {
  try {
    const response = await axios.get('/auth/user');

    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
};

export const register = async (credentials) => {
  try {
    const { data } = await axios.post('/auth/register', credentials);
    localStorage.setItem('vm-token', data.token);
    return data;
  } catch (err) {
    console.error(err);
    throw Error(err.response.data.error);
  }
};

export const login = async (credentials) => {
  try {
    const { data } = await axios.post('/auth/login', credentials);
    localStorage.setItem('vm-token', data.token);
    return data;
  } catch (err) {
    console.log('ERROR', err.response.data.error);
    throw Error(err.response.data.error);
  }
};

export const logout = async () => {
  try {
    await axios.delete('/auth/logout');
    localStorage.removeItem('vm-token');
  } catch (error) {
    console.error(error);
  }
};

export const buy = async (body) => {
  try {
    const { data } = await axios.post('/api/users/buy', body);
    return data;
  } catch (err) {
    console.log('ERROR', err.response.data.error);
    throw Error(err.response.data.error);
  }
};

export const reset = async (body) => {
  try {
    const { data } = await axios.post('/api/users/reset', body);
    return data;
  } catch (err) {
    console.log('ERROR', err.response.data.error);
    throw Error(err.response.data.error);
  }
};

export const deposit = async (body) => {
  try {
    const { data } = await axios.post('/api/users/deposit', body);
    return data;
  } catch (err) {
    console.log('ERROR', err.response.data.error);
    throw Error(err.response.data.error);
  }
};
