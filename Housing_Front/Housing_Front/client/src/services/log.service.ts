import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Property} from "../models/property";
import {HttpClient} from "@angular/common/http";
import {Log} from "../models/log";

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }
  public findAll(): Observable<Log[]> {
    return this.http.get<Log[]>('http://localhost:8080/logs');
  }
}
