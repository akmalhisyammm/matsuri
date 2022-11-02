import Image from 'next/image';
import { CustomButton } from 'components/atoms';
import { InputGroup } from 'components/molecules';

const CheckoutForm = () => {
  return (
    <section>
      <form action="" className="container form-semina">
        <div className="personal-details">
          <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-lg-center">
            <div className="form-title col-lg-8">
              <span>01</span>
              <div>Personal Details</div>
            </div>
          </div>
          <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-center">
            <InputGroup
              id="first_name"
              variant="mb-4 col-lg-4"
              label="First Name"
              type="text"
              placeholder="First name here"
            />
            <InputGroup
              id="last_name"
              variant="mb-4 col-lg-4"
              label="Last Name"
              type="text"
              placeholder="Last name here"
            />
          </div>
          <div className="row row-cols-lg-8 row-cols-md-2 row-cols-12 justify-content-center">
            <InputGroup
              id="email_address"
              variant="mb-4 col-lg-4"
              label="Email"
              type="email"
              placeholder="matsuri@example.com"
            />
            <InputGroup
              id="role"
              variant="mb-4 col-lg-4"
              label="Role"
              type="text"
              placeholder="Product Designer"
            />
          </div>
        </div>

        <div className="payment-method mt-4">
          <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-lg-center">
            <div className="form-title col-lg-8">
              <span>02</span>
              <div>Payment Method</div>
            </div>
          </div>
          <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-center gy-4 gy-md-0">
            <div className="col-lg-4">
              <label className="payment-radio h-100 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-4">
                  <Image src="/icons/ic-mastercard.svg" alt="" width={65} height={40} />
                  <div>Mastercard</div>
                </div>
                <input type="radio" name="radio" defaultChecked />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="col-lg-4">
              <label className="payment-radio h-100 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-4">
                  <Image src="/icons/ic-sewallet.svg" alt="" width={64} height={40} />
                  <div className="d-flex flex-column gap-1">
                    Sewallet
                    <span className="balance">Balance: $50,000</span>
                  </div>
                </div>
                <input type="radio" name="radio" />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center footer-payment gap-4">
          <CustomButton variant="btn-green">Pay Now</CustomButton>
          <div>
            <Image src="/icons/ic-secure.svg" alt="" width={20} height={20} />{' '}
            <span>Your payment is secure and encrypted</span>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckoutForm;
