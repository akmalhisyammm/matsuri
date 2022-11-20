import { toast } from 'react-toastify';
import axios from 'axios';

import { CLIENT_API_URL } from 'constants/api';

const instance = axios.create({
  baseURL: CLIENT_API_URL,
});

instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message = err.response.data.msg;

    if (typeof message === 'string') {
      toast.error(message);
    }

    return Promise.reject(Error(message));
  }
);

export default instance;
