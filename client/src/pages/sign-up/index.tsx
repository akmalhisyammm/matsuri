import { SignUpForm, SponsorList } from 'components/organisms';
import Layout from 'components/layout';

const SignUp = () => {
  return (
    <Layout title="Sign Up">
      <SignUpForm />
      <SponsorList theme="dark" />
    </Layout>
  );
};

export default SignUp;
