import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PropertyService} from '../../services/property.service';
import {Property} from '../../models/property';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Router} from '@angular/router';

import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {
  map,
  mergeMap,
  scan,
  startWith,
  tap,
  throttleTime
} from 'rxjs/operators';
import {AgentService} from '../../services/agent-service.service';

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
  queriesSize = 12;
  offset = new BehaviorSubject(null);
  infinite: Observable<Property[]>;
  agents;
  queries;
  private filtered: boolean;
  private batchMap: any;

  constructor(private propertyService: PropertyService, private agentService: AgentService,
              private elem: ElementRef, private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit() {
    this.filtered = false;
    this.clearFilters();
    this.agents = this.agentService.agents;

    this.clearAndReloadBatchMap();
    document.getElementById('body').style.overflow = 'hidden';
  }

  clearAndReloadBatchMap() {
    this.batchMap = of({});
    this.infinite = of(null);
    this.batchMap = this.offset.pipe(
      throttleTime(150),
      mergeMap(n => this.getBatch(n)),
      scan((acc, batch) => {
        return {...acc, ...batch};
      }, {}),
      startWith({}) // Initialize with an empty object
    );

    this.infinite = this.batchMap.pipe(map(v => Object.values(v)));
  }


  clearInfiniteScroll() {
    this.offset.next(1);
    this.theEnd = false;
    this.clearAndReloadBatchMap();
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
    document.getElementById('body').style.overflow = 'auto';
    this.router.navigate([s]);
  }

  nextBatch(offset) {
    if (this.theEnd) {
      document.getElementById('body').style.overflow = 'auto';
      return;
    }

    const end = this.filtered ? 1 : this.viewport.getRenderedRange().end;
    const total = this.filtered ? 1 : this.viewport.getDataLength();


    this.filtered = false;

    if (end >= total) {
      this.offset.next(offset);
    }
  }

  trackByIndex(i) {
    return i;
  }

  getBatch(lastSeen: number) {
    lastSeen = lastSeen == null ? 1 : lastSeen;
    return this.propertyService.getInRange(lastSeen, lastSeen + batchSize, this.queries).pipe(
      tap(arr => (arr.length > 2 ? null : (this.theEnd = true))),
      map(arr => {
        return arr.reduce((acc, curr) => {
          const id = curr.id;
          return {...acc, [id]: curr};
        }, {});
      })
    );
  }

  openFilter() {
    document.getElementById('overlayFilter').style.width = '100%';
  }

  closeFilter() {
    this.filtered = true;
    this.clearInfiniteScroll();
    document.getElementById('overlayFilter').style.width = '0%';
  }

  setAgent(agent: string) {
    console.log('Agent set: ' + agent);
    this.queries[0] = agent;
  }

  setName(name: string) {
    console.log('Name set: ' + name);
    this.queries[1] = name;
  }

  setMinimalPrice(value: string) {
    this.queries[2] = value;
  }

  setMaximalPrice(value: string) {
    this.queries[3] = value;
  }

  setRooms(rooms: string) {
    this.queries[4] = rooms;
  }

  setNumberOfBedrooms(value: string) {
    this.queries[5] = value;
  }

  setPropertyCity(city: string) {
    console.log('City set: ' + city);
    this.queries[6] = city;
  }

  setPropertyRegion(region: string) {
    console.log('Region set: ' + region);
    this.queries[7] = region;
  }

  setPropertyCountry(country: string) {
    console.log('Country set: ' + country);
    this.queries[8] = country;
  }

  setMinimalArea(value: string) {
    this.queries[9] = value;
  }

  setMaximalArea(value: string) {
    this.queries[10] = value;
  }

  clearFilters() {
    this.queries = new Array(this.queriesSize);
  }

  setParking(value: string) {
    this.queries[11] = value;
  }

  setStatus(value: string) {
    this.queries[12] = value;
  }
}
