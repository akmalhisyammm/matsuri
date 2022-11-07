import { NextSeo } from 'next-seo';

import { SignUpForm, SponsorList } from 'components/organisms';
import Layout from 'components/layout';

const SignUp = () => {
  return (
    <Layout>
      <NextSeo title="Sign Up" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/sign-up`} />

      <SignUpForm />
      <SponsorList theme="dark" />
    </Layout>
  );
};

export default SignUp;
