import Skeleton from 'react-loading-skeleton';

import { EventCard } from 'components/molecules';
import { useEventList } from 'hooks/events';

import type { IEventMain, IEventMainSWR } from 'types/event';

type EventListProps = {
  title: string;
  subtitle: string;
};

const EventList = ({ title, subtitle }: EventListProps) => {
  const { data, isLoading, isError }: IEventMainSWR = useEventList();

  return (
    <section className="grow-today">
      <div className="container">
        <div className="sub-title mb-1" id="grow-today">
          <span className="text-gradient-pink">{subtitle}</span>
        </div>
        <div className="title">{title}</div>

        <div className="mt-5 row gap">
          {!isError ? (
            data?.map((event: IEventMain) => (
              <div className="col-12 col-md-6 col-lg-4" key={event._id}>
                {!isLoading ? (
                  <EventCard
                    title={event.title}
                    subtitle={event.category.name}
                    description={event.venueName}
                    price={event.tickets[0].price}
                    imageUrl={`${process.env.NEXT_PUBLIC_API_URL}/${event.image.url}`}
                    href={`/detail/${event._id}`}
                  />
                ) : (
                  <Skeleton width="100%" height={300} borderRadius={20} />
                )}
              </div>
            ))
          ) : (
            <p>Failed to fetch event list.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventList;
