import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpHeaders, HttpEvent, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Photo} from '../models/photo';
import {Property} from "../models/property";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private baseUrl = 'http://localhost:8080/photos';

  constructor(private http: HttpClient) {
  }

  uploadPhoto(file: File): Observable<Photo> {
    const formData: FormData = new FormData();

    formData.append('photo', file);

    const req = new HttpRequest('POST', `${this.baseUrl}`, formData, {
      responseType: 'json'
    });
    return this.http.request<Photo>(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          return event.body as Photo;
        }
      }));
  }

  getPhotos(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
