import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay, skipWhile} from 'rxjs/operators';
import {PropertyService} from './property.service';
import {Property} from '../models/property';

@Injectable({
  providedIn: 'root'
})

export class PaginationService {

  private totalProperties: number;
  private properties: Property[];

  getItems(page = 1, itemsPerPage = 10): Property[] {
    while(!this.properties){
      delay(150);
    }
    const startIndex = (page - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage, +this.totalProperties);


    return this.properties.slice(startIndex, endIndex);
  }

  constructor(private propertyService: PropertyService) {
    propertyService.properties.subscribe(properties => {
      this.properties = properties;
    }, () => {
    }, () => {
    });


    propertyService.totalProperties.subscribe(count => {
        this.totalProperties = count;
      },
      () => {
        console.log('error')
      },
      () => {
      });
  }
}
