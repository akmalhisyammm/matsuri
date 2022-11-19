import { Heading } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import { EventsTable } from 'components/organisms';
import Layout from 'components/layout';

import type { GetServerSideProps } from 'next/types';

const Events = () => {
  return (
    <Layout>
      <NextSeo title="Events" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/events`} />

      <Heading as="h1" fontSize="3xl" marginBottom={8}>
        Events
      </Heading>

      <EventsTable />
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

export default Events;
