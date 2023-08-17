import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {PropertyService} from './property.service';
import {Property} from '../models/property';

@Injectable({
  providedIn: 'root'
})

export class PaginationService {

  // TODO add properties/count to get that
  private totalItems = 100;

  getItems(page = 1, itemsPerPage = 10): Observable<Property[]> {
    const startIndex = (page - 1) * itemsPerPage + 1;
    const endIndex = startIndex + itemsPerPage;
    const properties = [];
    for (let i = startIndex; i < endIndex; i++) {
      if (i < this.totalItems) {
        properties.push(this.propertyService.getById(i));
        console.log(this.propertyService.getById(i));
      }
    }
    return of(properties).pipe(delay(500));
  }

  constructor(private propertyService: PropertyService) {
  }
}
