import { Component, OnInit } from '@angular/core';
import {Property} from '../../models/property';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {PropertyService} from '../../services/property.service';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  property: Property;
  private routeSub: Subscription;
  private id: number;
  current: number;

  constructor(private propertyService: PropertyService, private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  ngOnInit() {
    this.current = 0;
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.propertyService.getById(this.id).subscribe(prop => this.property = prop);
  }

  getPath(photo: string): SafeResourceUrl {
    const imageUrl = 'data:image/jpg;base64,' + photo;
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  }
  move(step: number) {
    this.current = (this.current + step + this.property.photos.length) % this.property.photos.length;
  }
}
