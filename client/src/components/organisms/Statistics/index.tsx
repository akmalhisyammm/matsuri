import { StatisticItem } from 'components/molecules';

const Statistics = () => {
  return (
    <section className="statistics container">
      <div className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-5">
        <StatisticItem title="190K+" subtitle="Events Created" />
        <div className="vr" />
        <StatisticItem title="3M" subtitle="People Joined" />
        <div className="vr d-none d-md-block" />
        <StatisticItem title="5K+" subtitle="Success Startup" />
        <div className="vr" />
        <StatisticItem title="113K+" subtitle="Top Talents" />
      </div>
    </section>
  );
};

export default Statistics;
