import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { SignInForm, SponsorList } from 'components/organisms';
import Layout from 'components/layout';

const SignIn = () => {
  const router = useRouter();

  const { eventId, ticketId, organizerId } = router.query;

  return (
    <Layout>
      <NextSeo title="Sign In" canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/sign-in`} />

      <SignInForm
        checkoutQuery={
          { eventId, ticketId, organizerId } as Record<
            'eventId' | 'ticketId' | 'organizerId',
            string | undefined
          >
        }
      />
      <SponsorList theme="dark" />
    </Layout>
  );
};

export default SignIn;
