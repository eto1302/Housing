import {Address} from './address';
import {Photo} from './photo';

export class Property {
  id: number;
  name: string;
  description: string;
  address: Address;
  price: number;
  dateOfAvailability: Date;
  numberOfRooms: number;
  includingUtilities: boolean;
  photos: Photo[];
}
