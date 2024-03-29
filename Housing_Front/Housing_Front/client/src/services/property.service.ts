import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private propertiesUrl: string;
  properties: Observable<Property[]>;
  totalProperties: Observable<number>;

  constructor(private http: HttpClient) {
    this.propertiesUrl = 'http://localhost:8080/properties';
    this.count();
  }

  public findAll(): Observable<Property[]> {
    return this.properties;
  }

  public save(property: Property): Observable<Property> {
    return this.http.post<Property>(this.propertiesUrl, property);
  }

  public getById(id: number) {
    return this.http.get<Property>(this.propertiesUrl + '/' + id);
  }

  public count(){
    this.totalProperties = this.http.get<number>(this.propertiesUrl+'/count');
    return this.totalProperties;
  }

  public getInRange(begin: number, end: number, queries: string[]) : Observable<Property[]>{
    const requestBody = { queries };
    return this.http.post<Property[]>(this.propertiesUrl + '/' + begin + '/' + end, requestBody);
  }

  setPhotos(propertyId: number, ids: number[]) : Observable<string>{
    return this.http.post<string>(this.propertiesUrl + '/' + 'setPhotos' + '/' + propertyId, ids);
  }

  public edit(property: Property): Observable<Property> {
    return this.http.post<Property>(this.propertiesUrl + '/edit/' + property.id, property);
  }

  delete(id) {
    console.log(id);
    return this.http.delete<string>(this.propertiesUrl + '/' + id);
  }
}
