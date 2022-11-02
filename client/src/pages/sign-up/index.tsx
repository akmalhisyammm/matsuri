import Layout from 'components/layout';
import { SignUpForm, SponsorList } from 'components/organisms';

const SignUp = () => {
  return (
    <Layout title="Sign Up">
      <SignUpForm />
      <SponsorList theme="dark" />
    </Layout>
  );
};

export default SignUp;
