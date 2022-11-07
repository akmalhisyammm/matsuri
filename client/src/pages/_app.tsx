import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { DefaultSeo } from 'next-seo';

import { AuthProvider } from 'contexts/auth';

import defaultSEOConfig from '../../next-seo.config';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/main.css';

import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min');
  }, []);

  return (
    <>
      <DefaultSeo {...defaultSEOConfig} />

      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer position="top-right" />
      </AuthProvider>
    </>
  );
};

export default App;
