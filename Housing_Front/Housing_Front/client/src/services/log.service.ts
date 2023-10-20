import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Log} from '../models/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }
  public findAll(): Observable<Log[]> {
    return this.http.get<Log[]>('http://localhost:8080/logs');
  }
  public save(log: Log): Observable<Log> {
    return this.http.post<Log>('http://localhost:8080/logs', log);
  }

  getById(id: number): Observable<Log>{
    return this.http.get<Log>('http://localhost:8080/logs/' + id);
  }
}
