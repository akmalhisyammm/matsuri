import Image from 'next/image';

const BannerList = () => {
  return (
    <section className="d-flex flex-row flex-nowrap justify-content-center align-items-center gap-5 header-image">
      <Image
        src="/images/1.png"
        alt="Event Banner 1"
        className="img-1"
        width={1324}
        height={822}
        priority
      />
      <Image
        src="/images/2.png"
        alt="Event Banner 2"
        className="img-2"
        width={1676}
        height={1040}
        priority
      />
      <Image
        src="/images/1.png"
        alt="Event Banner 1"
        className="img-1"
        width={1324}
        height={822}
        priority
      />
    </section>
  );
};

export default BannerList;
