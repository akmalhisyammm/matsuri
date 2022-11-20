import Skeleton from 'react-loading-skeleton';
import moment from 'moment';

import { CustomImage } from 'components/atoms';
import { useParticipantOrders } from 'hooks/orders';

import type { IOrderSWR } from 'types/order';

const OrderList = () => {
  const { data, isLoading, isError }: IOrderSWR = useParticipantOrders();

  console.log(data);

  return (
    <section className="bg-navy">
      <div className="checkout container">
        <div className="text-center checkout-title">Your Order List</div>
        {!isError ? (
          !isLoading ? (
            data?.map((order) => (
              <div
                className="event-details container d-flex flex-wrap justify-content-lg-center align-items-center gap-5"
                key={order._id}>
                <div className="d-flex flex-column gap-3">
                  <h5>{order.eventHistory.title}</h5>

                  <div className="d-flex align-items-center gap-3">
                    <CustomImage
                      src="/icons/ic-marker-white.svg"
                      alt="Location"
                      width={32}
                      height={32}
                    />
                    <span>{order.eventHistory.venueName}</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <CustomImage src="/icons/ic-time-white.svg" alt="Time" width={32} height={32} />
                    <span>{moment(order.eventHistory.date).format('hh:mm A')}</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <CustomImage
                      src="/icons/ic-calendar-white.svg"
                      alt="Date"
                      width={32}
                      height={32}
                    />
                    <span>{moment(order.eventHistory.date).format('LL')}</span>
                  </div>
                </div>
                <div className="total-price">
                  {order.totalPay === 0 ? 'Free' : `$${order.totalPay}`}
                </div>
              </div>
            ))
          ) : (
            <Skeleton count={8} width={240} />
          )
        ) : (
          <p className="text-center mt-5">Failed to fetch order list.</p>
        )}
      </div>
    </section>
  );
};

export default OrderList;
