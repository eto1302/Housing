import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PropertyService} from '../../services/property.service';
import {Property} from '../../models/property';
import {BehaviorSubject, Observable} from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Router} from '@angular/router';

import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {map, mergeMap, scan, tap, throttleTime} from 'rxjs/operators';

const batchSize = 5;

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {


  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  theEnd = false;

  total: number;

  offset = new BehaviorSubject(null);
  infinite: Observable<Property[]>;

  constructor(private propertyService: PropertyService, private elem: ElementRef, private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit() {
    this.propertyService.totalProperties.subscribe(count => this.total = count);
    const batchMap = this.offset.pipe(
      throttleTime(150),
      mergeMap(n => this.getBatch(n)),
      scan((acc, batch) => {
        return {...acc, ...batch}
      }, {})
    );

    this.infinite = batchMap.pipe(map(v => Object.values(v)));
    document.getElementById('body').style.overflow = 'hidden';
  }

  getPath(photo: string): SafeResourceUrl {
    const imageUrl = 'data:image/jpg;base64,' + photo;
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  }

  getClass(i: number) {
    if (i % 4 === 0) {
      return 'blue';
    } else if (i % 4 === 1) {
      return 'red';
    } else if (i % 4 === 2) {
      return 'green';
    }
    return 'yellow';
  }

  redirect(s: string) {
    this.router.navigate([s]);
  }

  nextBatch(e, offset) {
    if (this.theEnd) {
      document.getElementById('body').style.overflow = 'auto';
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();


    if (end === total) {
      this.offset.next(offset);
    }
  }

  trackByIndex(i) {
    return i;
  }

  getBatch(lastSeen: number) {
    if (lastSeen === this.total) this.theEnd = true;
    console.log(this.theEnd);
    lastSeen = lastSeen == null ? 1 : lastSeen;
    return this.propertyService.getInRange(lastSeen, lastSeen + batchSize).pipe(
      tap(arr => (arr.length ? null : (this.theEnd = true))),
      map(arr => {
        return arr.reduce((acc, curr) => {
          const id = curr.id;
          return {...acc, [id]: curr};
        }, {});
      })
    );
  }

  openFilter() {
    document.getElementById('overlayFilter').style.width  = '100%';
  }

  closeFilter() {
    document.getElementById('overlayFilter').style.width  = '0%';
  }
}
