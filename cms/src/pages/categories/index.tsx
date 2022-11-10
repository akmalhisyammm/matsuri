import { Heading } from '@chakra-ui/react';

import { CategoriesTable } from 'components/organisms';
import Layout from 'components/layout';

import type { GetServerSideProps } from 'next/types';

const Categories = () => {
  return (
    <Layout>
      <Heading as="h1" fontSize="3xl" marginBottom={8}>
        Categories
      </Heading>

      <CategoriesTable />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Categories;
