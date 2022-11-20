import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { CustomButton, CustomImage, CustomRadio } from 'components/atoms';
import { InputGroup } from 'components/molecules';
import { useOrganizerPayments } from 'hooks/payments';
import { useEventDetail } from 'hooks/events';
import { postFetcher } from 'utils/fetcher';
import { getToken } from 'utils/storeToken';

import type { IEventDetailSWR } from 'types/event';
import type { IOrderTicket } from 'types/order';
import type { IPayment, IPaymentSWR } from 'types/payment';

type CheckoutFormProps = {
  eventId: string;
  ticketId: string;
  organizerId: string;
};

const CheckoutForm = ({ eventId, ticketId, organizerId }: CheckoutFormProps) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    paymentId: '',
    eventId,
  });

  const router = useRouter();

  const event: IEventDetailSWR = useEventDetail(eventId);
  const payments: IPaymentSWR = useOrganizerPayments(organizerId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setForm({ ...form, [id]: value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;

    setForm({ ...form, paymentId: id });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const orderedTicket: IOrderTicket[] = [];

    event.data?.tickets.map((ticket) => {
      if (ticket._id === ticketId) {
        const orderTicket = {
          ticketCategory: {
            type: ticket.type,
            price: ticket.price,
          },
          totalTicket: 1,
        };

        orderedTicket.push(orderTicket);
      }
    });

    const token = getToken();

    const payload = {
      personalDetail: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        role: form.role,
      },
      tickets: orderedTicket,
      eventId: form.eventId,
      paymentId: form.paymentId,
    };

    await postFetcher('/checkout', payload, token || undefined);

    toast.success('Checkout successful.');
    router.push('/dashboard');
  };

  return (
    <section>
      <form className="container form-semina" onSubmit={handleFormSubmit}>
        <div className="personal-details">
          <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-lg-center">
            <div className="form-title col-lg-8">
              <span>01</span>
              <div>Personal Details</div>
            </div>
          </div>

          <div className="row row-cols-lg-8 row-cols-md-2 row-cols-1 justify-content-center">
            <InputGroup
              id="firstName"
              variant="mb-4 col-lg-4"
              label="First Name"
              type="text"
              placeholder="First name here"
              onChange={handleInputChange}
            />
            <InputGroup
              id="lastName"
              variant="mb-4 col-lg-4"
              label="Last Name"
              type="text"
              placeholder="Last name here"
              onChange={handleInputChange}
            />
          </div>
          <div className="row row-cols-lg-8 row-cols-md-2 row-cols-12 justify-content-center">
            <InputGroup
              id="email"
              variant="mb-4 col-lg-4"
              label="Email"
              type="email"
              placeholder="matsuri@example.com"
              onChange={handleInputChange}
            />
            <InputGroup
              id="role"
              variant="mb-4 col-lg-4"
              label="Role"
              type="text"
              placeholder="Product Designer"
              onChange={handleInputChange}
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
            {payments.data?.map((payment: IPayment) => (
              <div key={payment._id} className="col-lg-4">
                <CustomRadio
                  variant="payment-radio"
                  name="payment"
                  id={payment._id}
                  label={payment.type}
                  imageUrl={`${process.env.NEXT_PUBLIC_API_URL}/${payment.image.url}`}
                  onChange={handlePaymentChange}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex flex-column align-items-center footer-payment gap-4">
          <CustomButton type="submit" variant="btn-green">
            Pay Now
          </CustomButton>
          <div>
            <CustomImage src="/icons/ic-secure.svg" alt="Secure" width={20} height={20} />{' '}
            <span>Your payment is secure and encrypted</span>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckoutForm;
