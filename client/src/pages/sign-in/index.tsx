import { SignInForm, SponsorList } from 'components/organisms';
import Layout from 'components/layout';

const SignIn = () => {
  return (
    <Layout title="Sign In">
      <SignInForm />
      <SponsorList theme="dark" />
    </Layout>
  );
};

export default SignIn;
