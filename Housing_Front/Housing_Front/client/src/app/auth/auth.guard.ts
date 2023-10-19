import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      const authenticate = () => {
        const enteredPassword = prompt('Please enter your password:');
        if (enteredPassword) {
          this.authService.authenticateWithPassword(enteredPassword).subscribe(
            (response: string) => {
              const token = response;
              if (token) {
                localStorage.setItem('authToken', token);
                this.authService.Authenticate();
                this.router.navigate([state.url]);
              } else {
                alert('Incorrect password. Please try again.');
                authenticate(); // Ask for the password again
              }
            },
            (error) => {
              alert('An error occurred. Please try again.');
              console.log(error);
              authenticate(); // Ask for the password again
            }
          );
        } else {
          return false; // User canceled or didn't provide a password
        }
      };

      authenticate(); // Start the authentication process

      return false; // Deny access until a valid password is entered
    }
  }
}
