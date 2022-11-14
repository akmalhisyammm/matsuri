import type { IImage } from './image';

export interface ITalent {
  _id: string;
  name: string;
  role: string;
  image: IImage;
}

export interface ITalentPayload {
  name: string;
  role: string;
  imageId: string;
}
