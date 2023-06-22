import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PropertyService} from '../../services/property.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private propertyService: PropertyService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  get properties() {
    return this.propertyService.properties;
  }

  getPath(photo: string): SafeResourceUrl {
    const imageUrl = 'data:image/jpg;base64,' + photo;
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  }
}
