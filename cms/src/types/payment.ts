import type { IImage } from './image';

export interface IPayment {
  _id: string;
  type: string;
  status: boolean;
  image: IImage;
}

export interface IPaymentHistory {
  type: string;
  image: string;
  organizer: string;
}

export interface IPaymentPayload {
  type: string;
  imageId: string;
}
