import {Component, OnInit} from '@angular/core';
import {Property} from "../../models/property";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  ngOnInit(): void {
    var password = prompt('Enter password', '');
    var isValid: boolean;
    this.http.post<boolean>('http://localhost:8080/password', password).subscribe(result => isValid = result,
      () => {
      },
      () => {
        if (isValid) {
          this.authService.Authenticate();
          this.router.navigate(['/createProperties']);
        }
      });
  }

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

}
