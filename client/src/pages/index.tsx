import Layout from 'components/layout';
import { EventList, SponsorList, Statistics, Story } from 'components/organisms';

const Home = () => {
  return (
    <Layout title="Home">
      <SponsorList theme="light" />
      <EventList title="Featured Events" subtitle="Grow Today" />
      <Story />
      <Statistics />
    </Layout>
  );
};

export default Home;
