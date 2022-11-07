import { useRouter } from 'next/router';

import { CheckoutDetail, CheckoutForm } from 'components/organisms';
import Layout from 'components/layout';

import type { GetServerSideProps } from 'next/types';

const Checkout = () => {
  const router = useRouter();

  const { eventId, ticketId, organizerId } = router.query;

  return (
    <Layout title="Checkout">
      <section className="bg-navy">
        <div className="checkout container">
          <div className="text-center checkout-title">Boost Your Knowledge and Experience</div>
          <CheckoutDetail eventId={eventId as string} ticketId={ticketId as string} />
          <CheckoutForm
            eventId={eventId as string}
            ticketId={ticketId as string}
            organizerId={organizerId as string}
          />
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Checkout;
