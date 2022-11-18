import { useContext } from 'react';
import { Box, Button, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

import { AuthContext } from 'contexts/auth';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const authCtx = useContext(AuthContext);

  return (
    <Box
      as="header"
      paddingX={8}
      paddingY={4}
      borderBottomWidth={1}
      backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
      <Flex gap={2} justifyContent="flex-end">
        <Button
          variant="outline"
          colorScheme="red"
          size="sm"
          isLoading={authCtx.isLoading}
          onClick={authCtx.signOut}>
          Sign Out
        </Button>
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="Theme Toggle"
          icon={colorMode === 'light' ? <RiMoonFill /> : <RiSunLine />}
          onClick={toggleColorMode}
        />
      </Flex>
    </Box>
  );
};

export default Header;
