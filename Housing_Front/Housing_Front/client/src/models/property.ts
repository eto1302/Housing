import {Address} from './address';
import {Photo} from './photo';

export class Property {
  id: number;
  agentName: string;
  name: string;
  description: string;
  address: Address;
  price: number;
  videoLink: string;
  dateOfAvailability: Date;
  numberOfRooms: number;
  includingUtilities: boolean;
  furnished: string;
  area: number;
  photos: Photo[];
}
