import { useRouter } from 'next/router';

import { BannerDetail, EventDetail, EventList, StatisticList, Story } from 'components/organisms';
import Layout from 'components/layout';

const Detail = () => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <Layout>
      <BannerDetail eventId={id as string} />
      <EventDetail eventId={id as string} />
      <EventList title="Similar Events" subtitle="Next One" />
      <Story />
      <StatisticList />
    </Layout>
  );
};

export default Detail;
