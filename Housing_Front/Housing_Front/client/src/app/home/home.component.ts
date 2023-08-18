import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {Property} from '../../models/property';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public properties: Observable<Property[]>;

  constructor(private propertyService: PropertyService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.properties = this.propertyService.properties;
  }

  getPath(photo: string): SafeResourceUrl {
    const imageUrl = 'data:image/jpg;base64,' + photo;
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  }
}
