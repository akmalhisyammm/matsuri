import { Box, Button, FormControl, FormLabel, Input, Image } from '@chakra-ui/react';
import { useContext, useState } from 'react';

import { AuthContext } from 'contexts/auth';

const SignInForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });

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
    <Box paddingX={12} paddingY={8} borderWidth={1} borderRadius={18} backgroundColor="gray.900">
      <Image src="/images/logo.png" alt="Matsuri" width={150} marginX="auto" marginBottom={4} />

      <form onSubmit={handleFormSubmit}>
        <FormControl marginY={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="email" id="email" name="email" onChange={handleInputChange} />
        </FormControl>
        <FormControl marginY={4}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input type="password" id="password" name="password" onChange={handleInputChange} />
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
