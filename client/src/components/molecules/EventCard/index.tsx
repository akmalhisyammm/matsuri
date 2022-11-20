import { CustomImage, CustomLink } from 'components/atoms';

type EventCardProps = {
  title: string;
  subtitle: string;
  description: string;
  price: number;
  imageUrl: string;
  href: string;
};

const EventCard = ({ title, subtitle, description, price, imageUrl, href }: EventCardProps) => {
  return (
    <div className="card-grow h-100">
      <span className="badge-pricing">{price > 0 ? `$${price}` : 'FREE'}</span>
      <CustomImage
        src={imageUrl}
        alt={title}
        width={776}
        height={436}
        placeholder="blur"
        blurDataURL="/images/logo.png"
        priority
      />

      <div className="card-content">
        <div className="card-title">{title}</div>
        <div className="card-subtitle">{subtitle}</div>
        <div className="description">{description}</div>
        <CustomLink href={href} variant="stretched-link" />
      </div>
    </div>
  );
};

export default EventCard;
