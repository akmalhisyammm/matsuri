import { ICategory } from './category';
import { IImage } from './image';
import { ITalent } from './talent';

export interface IEventTicket {
  _id: string;
  type: string;
  price: number;
  stock: number;
  status: boolean;
}

export interface IEventMain {
  _id: string;
  title: string;
  date: string;
  venueName: string;
  tickets: IEventTicket[];
  image: IImage;
  category: ICategory;
}

export interface IEventDetail {
  _id: string;
  title: string;
  date: string;
  about: string;
  tagline: string;
  keypoint: string[];
  venueName: string;
  status: 'Published' | 'Draft';
  tickets: IEventTicket[];
  image: IImage;
  category: ICategory;
  talent: ITalent;
  organizer: string;
}

export interface IEventHistory {
  title: string;
  date: string;
  about: string;
  tagline: string;
  keypoint: string[];
  venueName: string;
  status: 'Published' | 'Draft';
  tickets: IEventTicket[];
  image: string;
  category: string;
  talent: string;
  organizer: string;
}

export interface IEventMainSWR {
  data: IEventMain[];
  isLoading: boolean;
  isError: boolean;
}

export interface IEventDetailSWR {
  data: IEventDetail;
  isLoading: boolean;
  isError: boolean;
}
