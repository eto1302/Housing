import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: string | null = null;

  constructor(private http: HttpClient) {
    // Check for a saved token on service initialization
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      this.accessToken = storedToken;
    }
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  authenticateWithPassword(password: string): Observable<string> {
    // Replace 'your_authentication_endpoint' with your actual authentication endpoint
    const authenticationEndpoint = 'http://localhost:8080/password';

    return this.http.post(authenticationEndpoint, password, { responseType: 'text' });
  }

  Authenticate() {
    this.accessToken = localStorage.getItem('authToken');
  }
}
