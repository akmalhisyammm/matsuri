import { NextSeo } from 'next-seo';

import { NotFound } from 'components/organisms';
import Layout from 'components/layout';

const Rewards = () => {
  return (
    <Layout>
      <NextSeo title="Rewards" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/rewards`} />

      <NotFound message="Under Construction" />
    </Layout>
  );
};

export default Rewards;
