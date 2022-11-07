import { NextSeo } from 'next-seo';

import { NotFound } from 'components/organisms';
import Layout from 'components/layout';

const Browse = () => {
  return (
    <Layout>
      <NextSeo title="Browse" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/browse`} />

      <NotFound message="Under Construction" />
    </Layout>
  );
};

export default Browse;
