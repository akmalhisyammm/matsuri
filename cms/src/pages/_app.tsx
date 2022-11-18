import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from 'contexts/auth';
import { CategoryProvider } from 'contexts/category';
import { EventProvider } from 'contexts/event';
import { ImageProvider } from 'contexts/image';
import { PaymentProvider } from 'contexts/payment';
import { TalentProvider } from 'contexts/talent';
import { UserProvider } from 'contexts/user';
import customTheme from 'styles/customTheme';

import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <UserProvider>
          <ImageProvider>
            <CategoryProvider>
              <PaymentProvider>
                <TalentProvider>
                  <EventProvider>
                    <Component {...pageProps} />
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
