import Image from 'next/image';
import { useRouter } from 'next/router';
import { CustomButton } from 'components/atoms';

type TalentCardProps = {
  name: string;
  occupation: string;
  price: string;
  imageUrl: string;
  location: string;
  time: string;
  date: string;
};

const TalentCard = ({
  name,
  occupation,
  price,
  imageUrl,
  location,
  time,
  date,
}: TalentCardProps) => {
  const router = useRouter();

  return (
    <div className="d-flex flex-column card-event">
      <h6>Talent</h6>
      <div className="d-flex align-items-center gap-3 mt-3">
        <Image src={imageUrl} alt="semina" width={60} height={60} />
        <div>
          <div className="speaker-name">{name}</div>
          <span className="occupation">{occupation}</span>
        </div>
      </div>

      <hr />

      <h6>Get Ticket</h6>
      <div className="price my-3">
        ${price}
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

      <CustomButton variant="btn-green" action={() => router.push('/checkout')}>
        Get Ticket
      </CustomButton>
    </div>
  );
};

export default TalentCard;
