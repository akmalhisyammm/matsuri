import Cookies from 'js-cookie';

export const getToken = () => {
  const token = Cookies.get('token');

  if (token) {
    const decodedToken = window.atob(token);

    return decodedToken;
  }

  return null;
};

export const setToken = (token: string) => {
  const encodedToken = window.btoa(token);

  Cookies.set('token', encodedToken);
};

export const removeToken = () => {
  Cookies.remove('token');
};
