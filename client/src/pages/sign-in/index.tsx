import { NextSeo } from 'next-seo';

import { SignInForm, SponsorList } from 'components/organisms';
import Layout from 'components/layout';

const SignIn = () => {
  return (
    <Layout>
      <NextSeo title="Sign In" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/sign-in`} />

      <SignInForm />
      <SponsorList theme="dark" />
    </Layout>
  );
};

export default SignIn;
