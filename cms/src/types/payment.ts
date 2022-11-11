import type { IImage } from './image';

export interface IPayment {
  _id: string;
  type: string;
  status: boolean;
  image: IImage;
}
