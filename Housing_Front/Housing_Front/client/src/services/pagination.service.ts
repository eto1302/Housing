import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay, skipWhile} from 'rxjs/operators';
import {PropertyService} from './property.service';
import {Property} from '../models/property';

@Injectable({
  providedIn: 'root'
})

export class PaginationService {

  private totalProperties: Number;
  private properties: Property[];

  getItems(page = 1, itemsPerPage = 10): Property[] {
    while(!this.properties){
      delay(150);
    }
    console.log("stopped delaying")
    const startIndex = (page - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage, +this.totalProperties);

    console.log(this.properties.slice(startIndex, endIndex));

    return this.properties.slice(startIndex, endIndex);
  }

  processProperties(): void {
    // Access this.properties and do something with it
    if (this.properties) {
      console.log('Processing properties:', this.properties);
    } else {
      console.log('Properties are not available yet.');
    }
  }

  processTotals(): void {
    // Access this.properties and do something with it
    if (this.totalProperties) {
      console.log('Processing totalProperties:', this.totalProperties);
    } else {
      console.log('Total Properties are not available yet.');
    }
  }

  constructor(private propertyService: PropertyService) {
    propertyService.properties.subscribe(properties => {
      this.properties = properties;
      this.processProperties();
    }, () => {
      console.log(1)
    }, () => {
      console.log("propComp");
    });


    propertyService.totalProperties.subscribe(count => {
        this.totalProperties = count;
        this.processTotals();
      },
      () => {
        console.log(2)
      },
      () => {
        console.log("totalComp")
      });
      console.log(this.properties);
  }
}
