import { useRouter } from 'next/router';

import { ActivateForm, SponsorList } from 'components/organisms';
import Layout from 'components/layout';

const Activate = () => {
  const router = useRouter();

  const { email } = router.query;

  return (
    <Layout title="Sign Up">
      <ActivateForm email={email as string} />
      <SponsorList theme="dark" />
    </Layout>
  );
};

export default Activate;
