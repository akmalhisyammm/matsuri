import { Box, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

import Header from './Header';
import Sidebar from './Sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();

  if (router.pathname === '/') {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        minHeight="100vh"
        backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}>
        <IconButton
          variant="ghost"
          position="absolute"
          top={4}
          right={4}
          aria-label="Theme Toggle"
          icon={colorMode === 'light' ? <RiMoonFill /> : <RiSunLine />}
          onClick={toggleColorMode}
        />
        <Box as="main">{children}</Box>
      </Flex>
    );
  }

  return (
    <Flex minHeight="100vh" backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}>
      <Sidebar />

      <Box width="full">
        <Header />
        <Box as="main" padding={8}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
