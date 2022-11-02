import Image from 'next/image';
import { CustomButton } from 'components/atoms';
import { KeypointItem, TalentCard } from 'components/molecules';

const EventDetail = () => {
  return (
    <section className="details-content container">
      <div className="d-flex flex-wrap justify-content-lg-center gap">
        <div className="d-flex flex-column description">
          <div className="headline">Start Your Design Career With Design Sprint</div>

          <div className="event-details">
            <h6>Event Details</h6>
            <p className="details-paragraph">
              Most realtors and investors are using Social Media (Facebook and Google){' '}
              <b>ineffectively because</b> they don&apos;t know what they&apos;re doing or to start.
              They spend hours and hours trying different things and getting nowhere. This makes
              them feel like giving up on marketing altogether.
            </p>
            <p className="details-paragraph">
              We are a group of professionals who have decided to help people making travel
              experiences <b>whenever they want</b> and wherever they are. Our virtual tours have as
              their topic the beauties of the ancient world, such as Ancient Egypt or Ancient Rome,
              Art and History.
            </p>
          </div>

          <div className="keypoints">
            <KeypointItem
              iconUrl="/icons/ic-check.svg"
              description="Hours trying different things and getting nowhere makes them feel like giving up on marketing altogether."
            />
            <KeypointItem
              iconUrl="/icons/ic-check.svg"
              description="Hours trying different things and getting nowhere makes them feel like giving up on marketing altogether."
            />
            <KeypointItem
              iconUrl="/icons/ic-check.svg"
              description="Hours trying different things and getting nowhere makes them feel like giving up on marketing altogether."
            />
          </div>

          <div className="map-location">
            <h6>Event Location</h6>
            <div className="map-placeholder">
              <div className="maps">
                <Image src="/images/maps.png" alt="" width={1016} height={606} />
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
          name="John Doe"
          occupation="UI/UX Designer"
          price="50"
          imageUrl="/images/avatar.png"
          location="Jakarta, Indonesia"
          time="10:00 - 12:00 WIB"
          date="12 Jan 2021"
        />
      </div>
    </section>
  );
};

export default EventDetail;
