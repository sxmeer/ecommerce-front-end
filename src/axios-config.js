import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ecommerce-back-end-node.herokuapp.com/',
});

export default instance;