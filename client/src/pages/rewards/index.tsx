import { useRouter } from 'next/router';

import { CustomButton } from 'components/atoms';
import Layout from 'components/layout';

const Rewards = () => {
  const router = useRouter();

  return (
    <Layout title="Rewards">
      <div>
        <h1>This page is under construction.</h1>

        <CustomButton variant="btn-green" action={() => router.replace('/')}>
          Go to Home
        </CustomButton>
      </div>
    </Layout>
  );
};

export default Rewards;
