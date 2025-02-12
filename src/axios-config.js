import axios from 'axios';

const instance = axios.create({
  baseURL: "https://ecommerce-back-end-0ml3.onrender.com/",
});

export default instance;
