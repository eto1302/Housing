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

  constructor(private http: HttpClient) {
    this.propertiesUrl = 'http://localhost:8080/properties';
    this.findAll();
  }

  public findAll(): Observable<Property[]> {
    this.properties = this.http.get<Property[]>(this.propertiesUrl);
    return this.properties;
  }

  public save(property: Property): Observable<Property> {
    return this.http.post<Property>(this.propertiesUrl, property);
  }

  getById(id: number) {
    return this.http.get<Property>(this.propertiesUrl + '/' + id);
  }
}
