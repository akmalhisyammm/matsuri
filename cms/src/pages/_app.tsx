import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';

import { AuthProvider } from 'contexts/auth';
import { CategoryProvider } from 'contexts/category';
import { EventProvider } from 'contexts/event';
import { ImageProvider } from 'contexts/image';
import { OrderProvider } from 'contexts/order';
import { PaymentProvider } from 'contexts/payment';
import { TalentProvider } from 'contexts/talent';
import { UserProvider } from 'contexts/user';
import customTheme from 'styles/customTheme';

import defaultSEOConfig from '../../next-seo.config';

import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={customTheme}>
      <DefaultSeo {...defaultSEOConfig} />

      <AuthProvider>
        <UserProvider>
          <ImageProvider>
            <CategoryProvider>
              <PaymentProvider>
                <TalentProvider>
                  <EventProvider>
                    <OrderProvider>
                      <Component {...pageProps} />
                    </OrderProvider>
                  </EventProvider>
                </TalentProvider>
              </PaymentProvider>
            </CategoryProvider>
          </ImageProvider>
        </UserProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
