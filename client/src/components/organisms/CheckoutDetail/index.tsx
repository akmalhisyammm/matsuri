import Image from 'next/image';

const CheckoutDetail = () => {
  return (
    <section className="event-details container d-flex flex-wrap justify-content-lg-center align-items-center gap-5">
      <Image
        src="/images/details-image.png"
        className="event-image"
        alt="Event Image"
        width={2414}
        height={1356}
        priority
      />
      <div className="d-flex flex-column gap-3">
        <h5>
          Start Your Design Career <br className="d-none d-md-block" />
          With Design Sprint
        </h5>

        <div className="d-flex align-items-center gap-3">
          <Image src="/icons/ic-marker-white.svg" alt="" width={32} height={32} />
          <span>Gowork, Bandung</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <Image src="/icons/ic-time-white.svg" alt="" width={32} height={32} />
          <span>15.00 PM WIB</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <Image src="/icons/ic-calendar-white.svg" alt="" width={32} height={32} />
          <span>22 Agustus 2022</span>
        </div>
      </div>
      <div className="total-price">$2,980</div>
    </section>
  );
};

export default CheckoutDetail;
