import { useState } from 'react';
import Image from 'next/image';

import { CustomLink } from 'components/atoms';

type EventCardProps = {
  title: string;
  subtitle: string;
  description: string;
  price: number;
  imageUrl: string;
  href: string;
};

const EventCard = ({ title, subtitle, description, price, imageUrl, href }: EventCardProps) => {
  const [imageSrc, setImageSrc] = useState<string>(imageUrl);

  return (
    <div className="card-grow h-100">
      <span className="badge-pricing">{price > 0 ? `$${price}` : 'FREE'}</span>
      <Image
        src={imageSrc}
        alt={title}
        width={776}
        height={436}
        placeholder="blur"
        blurDataURL="/images/logo.png"
        onError={() => setImageSrc('/images/logo.png')}
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
