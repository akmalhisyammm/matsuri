import Image from 'next/image';
import { CustomButton } from 'components/atoms';
import { KeypointItem, TalentCard } from 'components/molecules';
import { useEventDetail } from 'hooks/events';
import { IEventDetailSWR } from 'types/event';
import { getToken } from 'utils/storeToken';
import { useRouter } from 'next/router';

type EventDetailProps = {
  eventId: string;
};

const EventDetail = ({ eventId }: EventDetailProps) => {
  const { data, isLoading, isError }: IEventDetailSWR = useEventDetail(eventId);

  const router = useRouter();

  const handleTicketSubmit = (ticketId: string) => {
    const token = getToken();

    if (!token) {
      router.push({
        pathname: '/sign-in',
        query: { eventId, ticketId, organizerId: data.organizer },
      });
    }

    router.push({
      pathname: `/checkout/${eventId}`,
      query: { eventId, ticketId, organizerId: data.organizer },
    });
  };

  if (isError) return <p>Failed to fetch data.</p>;

  return (
    <section className="details-content container">
      <div className="d-flex flex-wrap justify-content-lg-center gap">
        <div className="d-flex flex-column description">
          <div className="headline">{data.tagline}</div>

          <div className="event-details">
            <h6>Event Details</h6>
            <p className="details-paragraph">{data.about}</p>
          </div>

          <div className="keypoints">
            {data.keypoint.map((keypoint: string, idx: number) => (
              <KeypointItem key={idx} iconUrl="/icons/ic-check.svg" description={keypoint} />
            ))}
          </div>

          <div className="map-location">
            <h6>Event Location</h6>
            <div className="map-placeholder">
              <div className="maps">
                <Image src="/images/maps.png" alt="Maps" width={1016} height={606} />
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
          </div>
        </div>

        <TalentCard
          name={data.talent.name}
          occupation={data.talent.role}
          tickets={data.tickets}
          imageUrl="/images/avatar.png"
          location="Jakarta, Indonesia"
          time="10:00 - 12:00 WIB"
          date="12 Jan 2021"
          onSubmit={handleTicketSubmit}
        />
      </div>
    </section>
  );
};

export default EventDetail;
