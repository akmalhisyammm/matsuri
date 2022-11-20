import Skeleton from 'react-loading-skeleton';
import moment from 'moment';

import { CustomImage } from 'components/atoms';
import { useEventDetail } from 'hooks/events';

import type { IEventDetailSWR } from 'types/event';

type CheckoutDetailProps = {
  eventId: string;
  ticketId: string;
};

const CheckoutDetail = ({ eventId, ticketId }: CheckoutDetailProps) => {
  const { data, isLoading, isError }: IEventDetailSWR = useEventDetail(eventId);

  return (
    <section className="event-details container d-flex flex-wrap justify-content-lg-center align-items-center gap-5">
      {!isError ? (
        <>
          {!isLoading ? (
            <CustomImage
              src={`${process.env.NEXT_PUBLIC_API_URL}/${data?.image.url}`}
              className="event-image"
              alt={data?.title}
              width={2414}
              height={1356}
              priority
            />
          ) : (
            <Skeleton width={368} height={255} borderRadius={30} />
          )}

          <div className="d-flex flex-column gap-3">
            {!isLoading ? (
              <>
                <h5>{data?.title}</h5>

                <div className="d-flex align-items-center gap-3">
                  <CustomImage
                    src="/icons/ic-marker-white.svg"
                    alt="Location"
                    width={32}
                    height={32}
                  />
                  <span>{data?.venueName}</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <CustomImage src="/icons/ic-time-white.svg" alt="Time" width={32} height={32} />
                  <span>{moment(data?.date).format('hh:mm A')}</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <CustomImage
                    src="/icons/ic-calendar-white.svg"
                    alt="Date"
                    width={32}
                    height={32}
                  />
                  <span>{moment(data?.date).format('LL')}</span>
                </div>
              </>
            ) : (
              <Skeleton count={8} width={240} />
            )}
          </div>

          {!isLoading ? (
            data?.tickets.map(
              (ticket) =>
                ticket._id === ticketId && (
                  <div key={ticket._id} className="total-price">
                    {ticket.price === 0 ? 'Free' : `$${ticket.price}`}
                  </div>
                )
            )
          ) : (
            <Skeleton width={200} height={50} />
          )}
        </>
      ) : (
        <p>Failed to fetch checkout detail.</p>
      )}
    </section>
  );
};

export default CheckoutDetail;
