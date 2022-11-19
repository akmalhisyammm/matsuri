import { Heading } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import { UsersTable } from 'components/organisms';
import Layout from 'components/layout';

const Users = () => {
  return (
    <Layout>
      <NextSeo title="Users" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/users`} />

      <Heading as="h1" fontSize="3xl" marginBottom={8}>
        Users
      </Heading>

      <UsersTable />
    </Layout>
  );
};

export default Users;
