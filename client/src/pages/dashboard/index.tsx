import { NextSeo } from 'next-seo';

import { OrderList } from 'components/organisms';
import Layout from 'components/layout';

import type { GetServerSideProps } from 'next/types';

const Dashboard = () => {
  return (
    <Layout>
      <NextSeo title="Dashboard" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/dashboard`} />

      <OrderList />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Dashboard;
