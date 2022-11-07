import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';

import { useEventDetail } from 'hooks/events';

import type { IEventDetailSWR } from 'types/event';

type BannerDetailProps = {
  eventId: string;
};

const BannerDetail = ({ eventId }: BannerDetailProps) => {
  const { data, isLoading, isError }: IEventDetailSWR = useEventDetail(eventId);

  return (
    <section className="preview-image bg-navy text-center" style={{ height: 850 }}>
      {!isError ? (
        !isLoading ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${data?.image.url}`}
            className="img-content"
            alt={data?.title}
            width={2414}
            height={500}
            priority
          />
        ) : (
          <Skeleton width="75%" height={500} borderRadius={20} />
        )
      ) : (
        <p className="text-white">Failed to fetch event image.</p>
      )}
    </section>
  );
};

export default BannerDetail;
