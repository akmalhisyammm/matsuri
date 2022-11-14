import type { IImage } from './image';

export interface IPayment {
  _id: string;
  type: string;
  status: boolean;
  image: IImage;
}

export interface IPaymentPayload {
  type: string;
  imageId: string;
}
