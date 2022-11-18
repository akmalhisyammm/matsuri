import { Heading } from '@chakra-ui/react';

import { UsersTable } from 'components/organisms';
import Layout from 'components/layout';

const Users = () => {
  return (
    <Layout>
      <Heading as="h1" fontSize="3xl" marginBottom={8}>
        Users
      </Heading>

      <UsersTable />
    </Layout>
  );
};

export default Users;
