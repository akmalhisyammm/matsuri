import type { IEventHistory } from './event';
import type { IPaymentHistory } from './payment';

interface IPersonalDetail {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface ITicketCategory {
  type: string;
  price: number;
}

export interface IOrderTicket {
  _id: string;
  ticketCategory: ITicketCategory;
  totalTicket: number;
}

export interface IOrder {
  order: {
    _id: string;
    date: string;
    personalDetail: IPersonalDetail;
    status: 'Pending' | 'Paid' | 'Cancelled';
    totalPay: number;
    totalOrderTicket: number;
    orderItems: IOrderTicket[];
    eventHistory: IEventHistory;
    paymentHistory: IPaymentHistory;
    participant: string;
    payment: string;
    event: string;
  }[];
  pages: number;
  total: number;
}
