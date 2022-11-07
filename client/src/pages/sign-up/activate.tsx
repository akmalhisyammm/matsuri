import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { ActivateForm, SponsorList } from 'components/organisms';
import Layout from 'components/layout';

const Activate = () => {
  const router = useRouter();

  const { email } = router.query;

  return (
    <Layout>
      <NextSeo title="Activate" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/sign-up/activate`} />

      <ActivateForm email={email as string} />
      <SponsorList theme="dark" />
    </Layout>
  );
};

export default Activate;
