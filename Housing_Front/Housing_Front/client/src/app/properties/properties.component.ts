import {Component, OnInit, AfterContentInit, ElementRef} from '@angular/core';
import {PropertyService} from '../../services/property.service';
import {Property} from '../../models/property';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {PaginationService} from '../../services/pagination.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit, AfterContentInit {
  properties: Property[];
  private readonly saveScroll: EventListener;
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 10;

  toggleLoading = () => this.isLoading = !this.isLoading;

  // it will be called when this component gets initialized.
  loadData = () => {
    this.toggleLoading();
    this.paginationService.getItems(this.currentPage, this.itemsPerPage).subscribe({
      next: response => this.properties = response,
      error: err => console.log(err),
      complete: () => this.toggleLoading()
    });
  }
  appendData = () => {
    this.toggleLoading();
    this.paginationService.getItems(this.currentPage, this.itemsPerPage).subscribe({
      next: response => this.properties = [...this.properties, ...response],
      error: err => console.log(err),
      complete: () => this.toggleLoading()
    });
  }

  onScroll = () => {
    this.currentPage++;
    this.appendData();
  }

  constructor(private propertyService: PropertyService, private elem: ElementRef,
              private sanitizer: DomSanitizer, private router: Router,
              private paginationService: PaginationService) {
    this.saveScroll = () => {
      localStorage.setItem('scrollValue', window.scrollY.toString());
      console.log('Scroll: ' + window.scrollY);
    };
  }

  ngOnInit() {
    // this.properties = this.propertyService.findAll();
    this.loadData();
    // this.elem.nativeElement.querySelector('.properties-body').scrollTo(0, +localStorage.getItem('scrollValue'));
  }

  ngAfterContentInit() {
    window.addEventListener('scroll', this.saveScroll);
    setTimeout(() => {
      console.log('waited');
      window.scrollTo(0, +localStorage.getItem('scrollValue'));
    }, 1000);
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
    window.removeEventListener('scroll', this.saveScroll);
    console.log('Listener Removed');
    this.router.navigate([s]);
  }
}
