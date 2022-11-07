import { NextSeo } from 'next-seo';

import { NotFound } from 'components/organisms';
import Layout from 'components/layout';

const About = () => {
  return (
    <Layout>
      <NextSeo title="About" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/about`} />

      <NotFound message="Under Construction" />
    </Layout>
  );
};

export default About;
