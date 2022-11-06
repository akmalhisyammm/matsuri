import Image from 'next/image';

import { CustomButton } from 'components/atoms';

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
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`}
          alt="semina"
          width={60}
          height={60}
          style={{ objectFit: 'cover', borderRadius: '50%' }}
        />
        <div>
          <div className="speaker-name">{name}</div>
          <span className="occupation">{occupation}</span>
        </div>
      </div>

      <hr />

      <h6>Get Ticket</h6>
      {tickets?.map(
        (ticket: IEventTicket) =>
          ticket.status && (
            <div key={ticket._id}>
              <div className="price my-3">
                {ticket.price === 0 ? 'Free' : `$${ticket.price}`}
                <span>/person</span>
              </div>
              <div className="d-flex gap-3 align-items-center card-details">
                <Image src="/icons/ic-marker.svg" alt="semina" width={32} height={32} /> {location}
              </div>
              <div className="d-flex gap-3 align-items-center card-details">
                <Image src="/icons/ic-time.svg" alt="semina" width={32} height={32} /> {time}
              </div>
              <div className="d-flex gap-3 align-items-center card-details">
                <Image src="/icons/ic-calendar.svg" alt="semina" width={32} height={32} /> {date}
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
