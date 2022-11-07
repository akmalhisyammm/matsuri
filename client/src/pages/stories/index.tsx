import { NextSeo } from 'next-seo';

import { NotFound } from 'components/organisms';
import Layout from 'components/layout';

const Stories = () => {
  return (
    <Layout>
      <NextSeo title="Stories" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/stories`} />

      <NotFound message="Under Construction" />
    </Layout>
  );
};

export default Stories;
