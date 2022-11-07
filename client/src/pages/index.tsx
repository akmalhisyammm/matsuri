import { EventList, SponsorList, StatisticList, Story } from 'components/organisms';
import Layout from 'components/layout';

const Home = () => {
  return (
    <Layout>
      <SponsorList theme="light" />
      <EventList title="Featured Events" subtitle="Grow Today" />
      <Story />
      <StatisticList />
    </Layout>
  );
};

export default Home;
