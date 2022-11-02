import Layout from 'components/layout';
import { SignInForm, SponsorList } from 'components/organisms';

const SignIn = () => {
  return (
    <Layout title="Sign In">
      <SignInForm />
      <SponsorList theme="dark" />
    </Layout>
  );
};

export default SignIn;
