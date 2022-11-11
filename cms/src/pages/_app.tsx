import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from 'contexts/auth';
import { CategoryProvider } from 'contexts/category';
import { ImageProvider } from 'contexts/image';
import { PaymentProvider } from 'contexts/payment';
import customTheme from 'styles/customTheme';

import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <CategoryProvider>
          <PaymentProvider>
            <ImageProvider>
              <Component {...pageProps} />
            </ImageProvider>
          </PaymentProvider>
        </CategoryProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
