type StatisticItemProps = {
  title: string;
  subtitle: string;
};

const StatisticItem = ({ title, subtitle }: StatisticItemProps) => {
  return (
    <div className="d-flex flex-column align-items-center gap-1">
      <div className="title">{title}</div>
      <p>{subtitle}</p>
    </div>
  );
};

export default StatisticItem;
