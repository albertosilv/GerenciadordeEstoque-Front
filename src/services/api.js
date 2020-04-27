import axios from 'axios';

const api =  axios.create({
  baseURL: `https://floating-stream-30009.herokuapp.com`
});

export default api;
