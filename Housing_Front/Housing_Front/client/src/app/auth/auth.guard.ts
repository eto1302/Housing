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
  ): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      const authenticate = () => {
        const enteredPassword = prompt('Please enter your password:');
        if (enteredPassword) {
          this.authService.authenticateWithPassword(enteredPassword).subscribe(
            (result) => {
              console.log(result);
              if (result) {
                this.authService.Authenticate();
                this.router.navigate([state.url]);
                return true;
              } else {
                // Handle incorrect password (e.g., show an error message)
                alert('Incorrect password. Please try again.');
                authenticate(); // Ask for the password again
              }
            },
            (error) => {
              // Handle errors (e.g., show an error message)
              alert('An error occurred. Please try again.');
              authenticate(); // Ask for the password again
            }
          );
        } else {
          // User canceled or didn't provide a password
          return false; // Deny access until a valid password is entered
        }
      };

      authenticate(); // Start the authentication process

      return false; // Deny access until a valid password is entered
    }
  }
}
