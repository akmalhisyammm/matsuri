import Layout from 'components/layout';
import { BannerDetail, EventDetail, EventList, Statistics, Story } from 'components/organisms';

const Detail = () => {
  return (
    <Layout title="Detail">
      <BannerDetail />
      <EventDetail />
      <EventList title="Similar Events" subtitle="Next One" />
      <Story />
      <Statistics />
    </Layout>
  );
};

export default Detail;
