import { Heading } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import Layout from 'components/layout';
import { PaymentsTable } from 'components/organisms';

import type { GetServerSideProps } from 'next/types';

const Payments = () => {
  return (
    <Layout>
      <NextSeo title="Payments" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/payments`} />

      <Heading as="h1" fontSize="3xl" marginBottom={8}>
        Payments
      </Heading>

      <PaymentsTable />
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

export default Payments;
