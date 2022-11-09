import { ChakraProvider } from '@chakra-ui/react';

import customTheme from 'styles/customTheme';

import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
