import { Heading, List, ListIcon, ListItem } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import Layout from 'components/layout';

import type { GetServerSideProps } from 'next/types';
import { FaInfoCircle } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <Layout>
      <NextSeo title="Dashboard" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/dashboard`} />

      <Heading as="h1" fontSize="3xl">
        Dashboard
      </Heading>

      <List spacing={3} marginY={8}>
        <ListItem>
          <ListIcon as={FaInfoCircle} color="yellow.500" marginBottom={0.5} />
          This page is under construction.
        </ListItem>
      </List>
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

export default Dashboard;
