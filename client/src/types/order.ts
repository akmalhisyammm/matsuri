import { IEventHistory } from './event';
import { IUser } from './user';

export interface ITicketCategory {
  type: string;
  price: number;
}

export interface IOrderTicket {
  _id?: string;
  ticketCategory: ITicketCategory;
  totalTicket: number;
}

export interface IOrder {
  _id: string;
  personalDetail: IUser;
  status: 'Pending' | 'Paid' | 'Canceled';
  date: string;
  totalPay: number;
  totalOrderTicket: number;
  orderItems: IOrderTicket[];
  eventHistory: IEventHistory;
  participant: string;
  payment: string;
  event: string;
}

export interface IOrderSWR {
  data: IOrder[];
  isLoading: boolean;
  isError: boolean;
}
