import axios from 'axios';

import { CLIENT_API_URL } from 'constants/api';

const instance = axios.create({
  baseURL: CLIENT_API_URL,
});

instance.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(Error(err.response.data.msg))
);

export default instance;
