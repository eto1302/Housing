import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(private http: HttpClient) {
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }
  Authenticate(){
    this.isLoggedIn = true;
  }

  authenticateWithPassword(password: string): Observable<boolean> {
    // Replace 'your_authentication_endpoint' with your actual authentication endpoint
    const authenticationEndpoint = 'http://localhost:8080/password';

    // Return an Observable from the HTTP request
    return this.http.post<boolean>(authenticationEndpoint, password);
  }
}
