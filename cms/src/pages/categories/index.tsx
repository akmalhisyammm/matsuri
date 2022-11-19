import { Heading } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import { CategoriesTable } from 'components/organisms';
import Layout from 'components/layout';

import type { GetServerSideProps } from 'next/types';

const Categories = () => {
  return (
    <Layout>
      <NextSeo title="Categories" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/categories`} />

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
