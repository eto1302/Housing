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
  property: Observable<Property>;
  private routeSub: Subscription;
  private id: number;

  constructor(private propertyService: PropertyService, private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.property = this.propertyService.getById(this.id);
  }

  getPath(photo: string): SafeResourceUrl {
    const imageUrl = 'data:image/jpg;base64,' + photo;
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  }

}
