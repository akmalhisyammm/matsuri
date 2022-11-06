import { IImage } from './image';

export interface IPayment {
  _id: string;
  type: string;
  status: boolean;
  image: IImage;
  organizer: string;
}

export interface IPaymentSWR {
  data: IPayment[];
  isLoading: boolean;
  isError: boolean;
}
