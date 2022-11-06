import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message = err.response.data.msg;

    if (typeof message === 'string') {
      toast.error(message);
    }

    return Promise.reject(err.response);
  }
);

export default instance;
