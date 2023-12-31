import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:4000/tax/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
export default Api;
