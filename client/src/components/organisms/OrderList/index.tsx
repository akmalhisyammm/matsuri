import Image from 'next/image';
import moment from 'moment';

import { useParticipantOrders } from 'hooks/orders';

import type { IOrderSWR } from 'types/order';

const OrderList = () => {
  const { data, isLoading, isError }: IOrderSWR = useParticipantOrders();

  return (
    <section className="bg-navy">
      <div className="checkout container">
        <div className="text-center checkout-title">Your Order List</div>
        {data.map((order) => (
          <div
            className="event-details container d-flex flex-wrap justify-content-lg-center align-items-center gap-5"
            key={order._id}>
            <div className="d-flex flex-column gap-3">
              <h5>{order.eventHistory.title}</h5>

              <div className="d-flex align-items-center gap-3">
                <Image src="/icons/ic-marker-white.svg" alt="" />
                <span>{order.eventHistory.venueName}</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <Image src="/icons/ic-time-white.svg" alt="" />
                <span>{moment(order.eventHistory.date).format('HH.MM A')}</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <Image src="/icons/ic-calendar-white.svg" alt="" />
                <span>{order.eventHistory.date}</span>
              </div>
            </div>
            <div className="total-price">
              {order.totalPay === 0 ? 'Free' : `$${order.totalPay}`}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderList;
