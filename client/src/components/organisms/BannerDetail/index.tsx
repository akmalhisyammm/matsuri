import Image from 'next/image';

const BannerDetail = () => {
  return (
    <section className="preview-image bg-navy text-center">
      <Image
        src="/images/details-image.png"
        className="img-content"
        alt="Event Banner"
        width={2414}
        height={0}
        style={{ height: 'auto' }}
        priority
      />
    </section>
  );
};

export default BannerDetail;
