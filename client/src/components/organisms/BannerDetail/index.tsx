import Image from 'next/image';
import { useEventDetail } from 'hooks/events';
import { IEventDetailSWR } from 'types/event';

type BannerDetailProps = {
  eventId: string;
};

const BannerDetail = ({ eventId }: BannerDetailProps) => {
  const { data, isLoading, isError }: IEventDetailSWR = useEventDetail(eventId);

  if (isError) return <p>Failed to fetch data.</p>;

  return (
    <section className="preview-image bg-navy text-center">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/${data?.image.url}`}
        className="img-content"
        alt="Event Image"
        width={2414}
        height={0}
        style={{ height: 'auto' }}
        priority
      />
    </section>
  );
};

export default BannerDetail;
