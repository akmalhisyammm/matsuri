import { NotFound } from 'components/organisms';
import Layout from 'components/layout';

const Page404 = () => {
  return (
    <Layout title="Not Found">
      <NotFound message="Not Exist" />
    </Layout>
  );
};

export default Page404;
