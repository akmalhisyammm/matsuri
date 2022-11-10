import Layout from 'components/layout';
import { SignInForm } from 'components/organisms';

import type { GetServerSideProps } from 'next/types';

const Home = () => {
  return (
    <Layout>
      <SignInForm />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
