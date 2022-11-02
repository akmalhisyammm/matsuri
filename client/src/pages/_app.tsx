import { useEffect } from 'react';
import type { AppProps } from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min');
  }, []);

  return <Component {...pageProps} />;
};

export default App;
