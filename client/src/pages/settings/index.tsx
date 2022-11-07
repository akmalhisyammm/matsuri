import { NextSeo } from 'next-seo';

import { NotFound } from 'components/organisms';
import Layout from 'components/layout';

const Settings = () => {
  return (
    <Layout>
      <NextSeo title="Settings" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/settings`} />

      <NotFound message="Under Construction" />
    </Layout>
  );
};

export default Settings;
