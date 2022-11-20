import { CustomButton, CustomImage } from 'components/atoms';

import type { IEventTicket } from 'types/event';

type TalentCardProps = {
  name: string;
  occupation: string;
  tickets: IEventTicket[];
  imageUrl: string;
  location: string;
  time: string;
  date: string;
  onSubmit: (ticketId: string) => void;
};

const TalentCard = ({
  name,
  occupation,
  tickets,
  imageUrl,
  location,
  time,
  date,
  onSubmit,
}: TalentCardProps) => {
  return (
    <div className="d-flex flex-column card-event">
      <h6>Talent</h6>
      <div className="d-flex align-items-center gap-3 mt-3">
        <CustomImage
          src={imageUrl}
          alt={name}
          width={60}
          height={60}
          fallbackSrc="/images/favicon.png"
          style={{ objectFit: 'cover', borderRadius: '50%' }}
        />
        <div>
          <div className="speaker-name">{name}</div>
          <span className="occupation">{occupation}</span>
        </div>
      </div>

      {tickets?.map(
        (ticket: IEventTicket) =>
          ticket.status && (
            <div key={ticket._id}>
              <hr />
              <h6>{ticket.type} Ticket</h6>
              <div className="price my-3">
                {ticket.price === 0 ? 'Free' : `$${ticket.price}`}
                <span>/person</span>
              </div>
              <div className="d-flex gap-3 align-items-center card-details">
                <CustomImage src="/icons/ic-marker.svg" alt="Location" width={32} height={32} />{' '}
                {location}
              </div>
              <div className="d-flex gap-3 align-items-center card-details">
                <CustomImage src="/icons/ic-time.svg" alt="Time" width={32} height={32} /> {time}
              </div>
              <div className="d-flex gap-3 align-items-center card-details">
                <CustomImage src="/icons/ic-calendar.svg" alt="Date" width={32} height={32} />{' '}
                {date}
              </div>
              <div style={{ width: 300 }}>
                {ticket.stock ? (
                  <CustomButton variant="btn-green w-100" action={onSubmit.bind(null, ticket._id)}>
                    Buy Now
                  </CustomButton>
                ) : (
                  <CustomButton variant="btn-navy w-100 mt-2" disabled>
                    Sold Out
                  </CustomButton>
                )}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default TalentCard;
