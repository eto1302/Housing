import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  properties: Observable<Property[]>;

  constructor(private propertyService: PropertyService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.properties = this.propertyService.findAll();
  }

  getPath(photo: string): SafeResourceUrl {
    const imageUrl = 'data:image/jpg;base64,' + photo;
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  }
}
