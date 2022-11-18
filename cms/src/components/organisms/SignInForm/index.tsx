import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Image,
  useColorMode,
  InputGroup,
  IconButton,
  InputRightElement,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

import { AuthContext } from 'contexts/auth';

import type { IUserPayload } from 'types/user';

const SignInForm = () => {
  const [form, setForm] = useState<IUserPayload>({ email: '', password: '' });
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const { colorMode } = useColorMode();

  const authCtx = useContext(AuthContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    authCtx.signIn(form.email, form.password);
  };

  return (
    <Box
      paddingX={10}
      paddingY={8}
      borderWidth={1}
      borderRadius={18}
      backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
      <Image src="/images/logo.png" alt="Matsuri" width={150} marginX="auto" marginBottom={4} />

      <form onSubmit={handleFormSubmit}>
        <FormControl marginY={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl marginY={4}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              type={isShowPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                size="sm"
                aria-label={isShowPassword ? 'Hide' : 'Show'}
                icon={isShowPassword ? <FaEyeSlash /> : <FaEye />}
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          type="submit"
          colorScheme="green"
          width="full"
          marginY={2}
          isLoading={authCtx.isLoading}>
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default SignInForm;
