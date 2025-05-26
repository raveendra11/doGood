import axios from 'axios';

const API_URL = 'https://my-springboot-service-482150591633.us-central1.run.app/api/users';

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const getUsers = async () => {
  return await axios.get(API_URL);
};