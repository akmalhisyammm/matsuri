import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';

import { CustomButton, CustomImage } from 'components/atoms';
import { KeypointItem, TalentCard } from 'components/molecules';
import { useEventDetail } from 'hooks/events';
import { getToken } from 'utils/storeToken';

import type { IEventDetailSWR } from 'types/event';

type EventDetailProps = {
  eventId: string;
};

const EventDetail = ({ eventId }: EventDetailProps) => {
  const router = useRouter();

  const { data, isLoading, isError }: IEventDetailSWR = useEventDetail(eventId);

  const handleBuyClick = (ticketId: string) => {
    const token = getToken();

    if (!token) {
      router.push({
        pathname: '/sign-in',
        query: { eventId, ticketId, organizerId: data?.organizer },
      });
    } else {
      router.push({
        pathname: `/checkout/${eventId}`,
        query: { ticketId, organizerId: data?.organizer },
      });
    }
  };

  return (
    <>
      <NextSeo
        title={data?.title}
        canonical={`${process.env.NEXT_PUBLIC_WEB_URL}/detail/${eventId}`}
      />

      <section className="details-content container" style={{ marginTop: -160 }}>
        {!isError ? (
          <div className="d-flex flex-wrap justify-content-lg-center gap">
            <div className="d-flex flex-column description w-100">
              {!isLoading ? (
                <div className="headline">{data?.title}</div>
              ) : (
                <Skeleton count={3} width="100%" />
              )}

              <div className="event-details">
                <h6>Event Details</h6>
                {!isLoading ? (
                  <p className="details-paragraph">{data?.about}</p>
                ) : (
                  <Skeleton count={10} width="100%" />
                )}
              </div>

              <div className="keypoints">
                {!isLoading ? (
                  data?.keypoint.map((keypoint: string, idx: number) => (
                    <KeypointItem key={idx} iconUrl="/icons/ic-check.svg" description={keypoint} />
                  ))
                ) : (
                  <Skeleton count={10} width="100%" />
                )}
              </div>

              <div className="map-location">
                <h6>Event Location</h6>
                {!isLoading ? (
                  <div className="map-placeholder">
                    <div className="maps">
                      <CustomImage src="/images/maps.png" alt="Maps" width={1016} height={606} />
                      <div
                        className="absolute d-flex justify-content-center align-items-center"
                        onMouseOver={(e) => {
                          (e.currentTarget.children[0] as HTMLElement).style.opacity = '100';
                          e.currentTarget.style.backgroundColor = '#151a2638';
                        }}
                        onMouseOut={(e) => {
                          (e.currentTarget.children[0] as HTMLElement).style.opacity = '0';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}>
                        <CustomButton variant="btn-navy">View in Google Maps</CustomButton>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Skeleton width="100%" height={300} borderRadius={20} />
                )}
              </div>
            </div>

            {!isLoading ? (
              <TalentCard
                name={data?.talent.name}
                occupation={data?.talent.role}
                tickets={data?.tickets}
                imageUrl={`${process.env.NEXT_PUBLIC_API_URL}/${data?.talent.image.url}`}
                location={data?.venueName}
                time={moment(data?.date).format('hh:mm A')}
                date={moment(data?.date).format('LL')}
                action={handleBuyClick}
              />
            ) : (
              <div className="w-100" style={{ maxWidth: 350 }}>
                <Skeleton width="100%" height={500} borderRadius={20} />
              </div>
            )}
          </div>
        ) : (
          <p className="text-white">Failed to fetch event detail.</p>
        )}
      </section>
    </>
  );
};

export default EventDetail;
