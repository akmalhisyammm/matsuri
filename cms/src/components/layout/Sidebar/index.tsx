import { Box, Button, Image, useColorMode, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaCalendar, FaCreditCard, FaHome, FaList, FaReceipt, FaStar } from 'react-icons/fa';

const Sidebar = () => {
  const router = useRouter();

  const { colorMode } = useColorMode();

  return (
    <Box
      as="aside"
      width="20rem"
      height="100vh"
      paddingX={6}
      paddingY={8}
      borderRightWidth={1}
      backgroundColor={colorMode === 'light' ? 'gray.100' : 'gray.900'}>
      <Image src="/images/logo.png" alt="Matsuri" width={150} marginX="auto" marginBottom={8} />

      <VStack>
        <Button
          variant={router.pathname === '/dashboard' ? 'solid' : 'ghost'}
          colorScheme="blue"
          width="full"
          justifyContent="start"
          leftIcon={<FaHome />}
          onClick={() => router.push('/dashboard')}>
          Dashboard
        </Button>
        <Button
          variant={router.pathname === '/categories' ? 'solid' : 'ghost'}
          colorScheme="blue"
          width="full"
          justifyContent="start"
          leftIcon={<FaList />}
          onClick={() => router.push('/categories')}>
          Categories
        </Button>
        <Button
          variant={router.pathname === '/payments' ? 'solid' : 'ghost'}
          colorScheme="blue"
          width="full"
          justifyContent="start"
          leftIcon={<FaCreditCard />}
          onClick={() => router.push('/payments')}>
          Payments
        </Button>
        <Button
          variant={router.pathname === '/talents' ? 'solid' : 'ghost'}
          colorScheme="blue"
          width="full"
          justifyContent="start"
          leftIcon={<FaStar />}
          onClick={() => router.push('/talents')}>
          Talents
        </Button>
        <Button
          variant={router.pathname === '/events' ? 'solid' : 'ghost'}
          colorScheme="blue"
          width="full"
          justifyContent="start"
          leftIcon={<FaCalendar />}
          onClick={() => router.push('/events')}>
          Events
        </Button>
        <Button
          variant={router.pathname === '/orders' ? 'solid' : 'ghost'}
          colorScheme="blue"
          width="full"
          justifyContent="start"
          leftIcon={<FaReceipt />}
          onClick={() => router.push('/orders')}>
          Orders
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;
