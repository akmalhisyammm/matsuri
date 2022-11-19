import { useContext } from 'react';
import { Badge, Box, Button, HStack, IconButton, Text, useColorMode } from '@chakra-ui/react';
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
      <HStack justifyContent="space-between">
        <HStack>
          <Badge
            variant="outline"
            colorScheme={
              authCtx.user?.role === 'Owner'
                ? 'purple'
                : authCtx.user?.role === 'Organizer'
                ? 'teal'
                : 'cyan'
            }>
            {authCtx.user?.role}
          </Badge>
          <Text fontSize="sm" fontWeight={700}>
            {authCtx.user?.name}
          </Text>
        </HStack>
        <HStack>
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
        </HStack>
      </HStack>
    </Box>
  );
};

export default Header;
