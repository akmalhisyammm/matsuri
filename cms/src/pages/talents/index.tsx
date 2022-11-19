import { Heading } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import { TalentsTable } from 'components/organisms';
import Layout from 'components/layout';

import type { GetServerSideProps } from 'next/types';

const Talents = () => {
  return (
    <Layout>
      <NextSeo title="Talents" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/talents`} />

      <Heading as="h1" fontSize="3xl" marginBottom={8}>
        Talents
      </Heading>

      <TalentsTable />
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

export default Talents;
