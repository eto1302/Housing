import { Address } from './address';
import { Photo } from './photo';

export class Property {
  id = 0;
  agentName = '';
  name = '';
  description = '';
  address = new Address();
  price = 0;
  serviceCosts = 0;
  specifics = '';
  videoLink = '';
  dateOfAvailability = null;
  dateOfOffer = null;
  numberOfRooms = 0;
  numberOfBedrooms = 0;
  numberOfBathrooms = 0;
  numberOfFloors = 0;
  facilities = '';
  includingUtilities = false;
  interior = '';
  livingArea = 0;
  plotArea = 0;
  volume = 0;
  status = '';
  typeOfHouse = '';
  typeOfConstruction = '';
  yearOfConstruction = 0;
  balconyArea = 0;
  gardenArea = 0;
  typeOfParking = '';
  photos = [];

  constructor() {
  }
}

