import axios from 'axios';

export const fetchUser = async () => {
  const response = await axios.get('/auth/user');
  if (response.statusText !== 'OK') {
    return response.data.message;
  }
  return response.data;
};

export const register = async (credentials) => {
  try {
    const { data } = await axios.post('/auth/register', credentials);
    localStorage.setItem('vm-token', data.token);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials);

    localStorage.setItem('vm-token', response.data.token);
    return response.data;
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
    console.log('BUY API', data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const reset = async (body) => {
  try {
    const { data } = await axios.post('/api/users/reset', body);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deposit = async (body) => {
  try {
    const { data } = await axios.post('/api/users/deposit', body);
    return data;
  } catch (error) {
    console.error(error);
  }
};
