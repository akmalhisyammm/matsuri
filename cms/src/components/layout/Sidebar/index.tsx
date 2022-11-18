import { Box, Button, Image, useColorMode, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import {
  FaCalendar,
  FaCreditCard,
  FaHome,
  FaList,
  FaReceipt,
  FaStar,
  FaUsers,
} from 'react-icons/fa';

import { CategoryContext } from 'contexts/category';
import { EventContext } from 'contexts/event';
import { PaymentContext } from 'contexts/payment';
import { TalentContext } from 'contexts/talent';
import { UserContext } from 'contexts/user';

const Sidebar = () => {
  const router = useRouter();

  const { colorMode } = useColorMode();

  const categoriesCtx = useContext(CategoryContext);
  const eventsCtx = useContext(EventContext);
  const paymentsCtx = useContext(PaymentContext);
  const talentsCtx = useContext(TalentContext);
  const usersCtx = useContext(UserContext);

  return (
    <Box
      as="aside"
      width="20rem"
      height="100vh"
      paddingX={6}
      paddingY={8}
      borderRightWidth={1}
      backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
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
        {usersCtx.authorizedAccess.includes('READ') && (
          <Button
            variant={router.pathname === '/users' ? 'solid' : 'ghost'}
            colorScheme="blue"
            width="full"
            justifyContent="start"
            leftIcon={<FaUsers />}
            onClick={() => router.push('/users')}>
            Users
          </Button>
        )}
        {categoriesCtx.authorizedAccess.includes('READ') && (
          <Button
            variant={router.pathname === '/categories' ? 'solid' : 'ghost'}
            colorScheme="blue"
            width="full"
            justifyContent="start"
            leftIcon={<FaList />}
            onClick={() => router.push('/categories')}>
            Categories
          </Button>
        )}
        {paymentsCtx.authorizedAccess.includes('READ') && (
          <Button
            variant={router.pathname === '/payments' ? 'solid' : 'ghost'}
            colorScheme="blue"
            width="full"
            justifyContent="start"
            leftIcon={<FaCreditCard />}
            onClick={() => router.push('/payments')}>
            Payments
          </Button>
        )}
        {talentsCtx.authorizedAccess.includes('READ') && (
          <Button
            variant={router.pathname === '/talents' ? 'solid' : 'ghost'}
            colorScheme="blue"
            width="full"
            justifyContent="start"
            leftIcon={<FaStar />}
            onClick={() => router.push('/talents')}>
            Talents
          </Button>
        )}
        {eventsCtx.authorizedAccess.includes('READ') && (
          <Button
            variant={router.pathname === '/events' ? 'solid' : 'ghost'}
            colorScheme="blue"
            width="full"
            justifyContent="start"
            leftIcon={<FaCalendar />}
            onClick={() => router.push('/events')}>
            Events
          </Button>
        )}
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
