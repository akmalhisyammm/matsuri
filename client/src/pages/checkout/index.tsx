import Layout from 'components/layout';
import { CheckoutDetail, CheckoutForm } from 'components/organisms';

const Checkout = () => {
  return (
    <Layout title="Checkout">
      <section className="bg-navy">
        <div className="checkout container">
          <div className="text-center checkout-title">Boost Your Experience</div>
          <CheckoutDetail />
          <CheckoutForm />
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
