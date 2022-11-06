import { IImage } from './image';

export interface ITalent {
  _id: string;
  name: string;
  role: string;
  image: IImage;
  organizer: string;
}
