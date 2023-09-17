import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PropertyService} from '../../services/property.service';
import {Property} from '../../models/property';
import {BehaviorSubject, Observable} from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Router} from '@angular/router';

import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {map, mergeMap, scan, tap, throttleTime} from 'rxjs/operators';
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

  total: number;

  offset = new BehaviorSubject(null);
  lastLoaded;
  infinite: Observable<Property[]>;
  agents;
  queries;

  constructor(private propertyService: PropertyService, private agentService: AgentService,
              private elem: ElementRef, private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit() {
    this.queries = new Array(11);
    this.agents = this.agentService.agents;
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

  nextBatch(offset) {
    console.log("nextBatch");
    if (this.theEnd) {
      document.getElementById('body').style.overflow = 'auto';
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    if (end >= total) {
      this.offset.next(offset);
      this.lastLoaded = offset;
    }
  }

  trackByIndex(i) {
    return i;
  }

  getBatch(lastSeen: number): Observable<any> {
    console.log("getBatch");
    if (lastSeen >= this.total) this.theEnd = true;

    lastSeen = lastSeen == null ? 1 : lastSeen;

    return this.propertyService.getInRange(lastSeen, lastSeen + batchSize).pipe(
      tap(arr => console.log('After getInRange:', arr)),
      map(arr => {
        console.log('After map:', arr);
        return this.queryFilter(arr);
      }),
      map((arr: any[]) => {
        console.log('After reduce:', arr);
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
    document.getElementById('overlayFilter').style.width = '0%';
  }

  queryFilter(arr) {
    const result = arr.filter(property => {
      return (
        (!this.queries[0] || property.agentName === this.queries[0]) &&
        (!this.queries[1] || property.name === this.queries[1]) &&
        (!this.queries[2] || property.price === this.queries[2]) &&
        (!this.queries[3] || property.numberOfRooms === this.queries[3]) &&
        (!this.queries[4] || property.property.address.street === this.queries[4]) &&
        (!this.queries[5] || property.property.address.city === this.queries[5]) &&
        (!this.queries[6] || property.property.address.region === this.queries[6]) &&
        (!this.queries[7] || property.property.address.country === this.queries[7]) &&
        (!this.queries[8] || property.property.address.postal === this.queries[8]) &&
        (!this.queries[9] || property.property.address.x === this.queries[9]) &&
        (!this.queries[10] || property.property.address.y === this.queries[10])
      );
    });
    if(result.length === 0) {
      this.lastLoaded += batchSize;
      console.log("changed lastLoaded to " + this.lastLoaded);
      this.nextBatch(this.lastLoaded);
    }
    return result;
  }

  setAgent(agent: string) {
    console.log('Agent set: ' + agent);
    this.queries[0] = agent;
  }

  setName(name: string) {
    console.log('Name set: ' + name);
    this.queries[1] = name;
  }

  setPrice(price: string) {
    console.log('Price set: ' + price);
    this.queries[2] = price;
  }

  setRooms(rooms: string) {
    console.log('Number of rooms set: ' + rooms);
    this.queries[3] = rooms;
  }

  setPropertyStreet(street: string) {
    console.log('Street set: ' + street);
    this.queries[4] = street;
  }

  setPropertyCity(city: string) {
    console.log('City set: ' + city);
    this.queries[5] = city;
  }

  setPropertyRegion(region: string) {
    console.log('Region set: ' + region);
    this.queries[6] = region;
  }

  setPropertyCountry(country: string) {
    console.log('Country set: ' + country);
    this.queries[7] = country;
  }

  setPropertyPostal(postal: string) {
    console.log('Postal code set: ' + postal);
    this.queries[8] = postal;
  }

  setPropertyX(x: string) {
    console.log('Property X set: ' + x);
    this.queries[9] = x;
  }

  setPropertyY(y: string) {
    console.log('Property Y set: ' + y);
    this.queries[10] = y;
  }

}
