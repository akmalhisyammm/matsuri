import { NextSeo } from 'next-seo';

import { NotFound } from 'components/organisms';
import Layout from 'components/layout';

const Page404 = () => {
  return (
    <Layout>
      <NextSeo title="404" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/*`} />

      <NotFound message="Not Exist" />
    </Layout>
  );
};

export default Page404;
