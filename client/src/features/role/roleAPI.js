import axios from 'axios';

export const fetchRoles = async () => {
  try {
    const { data } = await axios.get('/auth/roles');
    return data;
  } catch (error) {
    console.error(error);
  }
};
