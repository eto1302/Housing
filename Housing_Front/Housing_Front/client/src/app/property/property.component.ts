import {Component, OnInit, SecurityContext} from '@angular/core';
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

  constructor(private propertyService: PropertyService, protected sanitizer: DomSanitizer, private route: ActivatedRoute) { }

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
    if(this.property.videoLink) this.current = (this.current + step + this.property.photos.length + 1) % (this.property.photos.length + 1);
    else this.current = (this.current + step + this.property.photos.length) % (this.property.photos.length);
  }

  isActive(index: number) {
    console.log(this.property.videoLink === undefined);
    console.log(index);
    console.log(this.current);
    if(this.property.videoLink) return index === this.current - 1;
    return index === this.current;
  }
}
