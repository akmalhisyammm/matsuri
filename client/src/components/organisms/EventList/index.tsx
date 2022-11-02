import { EventCard } from 'components/molecules';

type EventListProps = {
  title: string;
  subtitle: string;
};

const EventList = ({ title, subtitle }: EventListProps) => {
  return (
    <section className="grow-today">
      <div className="container">
        <div className="sub-title mb-1" id="grow-today">
          <span className="text-gradient-pink">{subtitle}</span>
        </div>
        <div className="title">{title}</div>

        <div className="mt-5 row gap">
          <div className="col-lg-3 col-md-6 col-12">
            <EventCard
              title="Learn Jira for Sprint Design Venture"
              subtitle="Product Design"
              description="Bandung, 22 Jan 2022"
              price={229}
              imageUrl="/images/card-1.png"
              href="/detail/1"
            />
          </div>
          <div className="col-lg-3 col-md-6 col-12">
            <EventCard
              title="Team Management for Long Term"
              subtitle="Product Design"
              description="Jakarta, 11 Aug 2022"
              price={0}
              imageUrl="/images/card-2.png"
              href="/detail/2"
            />
          </div>
          <div className="col-lg-3 col-md-6 col-12">
            <EventCard
              title="Set Marketing Target For SaaS Bii"
              subtitle="Product Design"
              description="Bandung, 22 Jan 2022"
              price={80}
              imageUrl="/images/card-3.png"
              href="/detail/3"
            />
          </div>
          <div className="col-lg-3 col-md-6 col-12">
            <EventCard
              title="Google Adsense from Zero to Big Bucks"
              subtitle="Product Design"
              description="Jakarta, 11 Aug 2022"
              price={90}
              imageUrl="/images/card-4.png"
              href="/detail/4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventList;
