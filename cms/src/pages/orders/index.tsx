import { Heading } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import { OrdersTable } from 'components/organisms';
import Layout from 'components/layout';

import type { GetServerSideProps } from 'next/types';

const Orders = () => {
  return (
    <Layout>
      <NextSeo title="Orders" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/orders`} />

      <Heading as="h1" fontSize="3xl" marginBottom={8}>
        Orders
      </Heading>

      <OrdersTable />
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

export default Orders;
