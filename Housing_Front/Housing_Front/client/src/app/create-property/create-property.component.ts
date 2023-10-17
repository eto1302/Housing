import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder} from '@angular/forms';
import {PropertyService} from '../../services/property.service';
import {HttpErrorResponse} from '@angular/common/http';
import {PhotoService} from '../../services/photo.service';
import {Observable} from 'rxjs';
import {AgentService} from '../../services/agent-service.service';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent implements OnInit {
  agents;
  fileName = '';
  private property = {
    id: null,
    agentName: null,
    name: null,
    description: null,
    address: {
      id: null,
      street: null,
      city: null,
      region: null,
      country: null,
      postalCode: null,
      latitude: null,
      longitude: null
    },
    price: null,
    numberOfRooms: null,
    videoLink: null,
    furnished: null,
    area:null,
    dateOfAvailability: null,
    photos: [],
    includingUtilities: false
  };
  private photos = [];

  createPropertyForm = this.formBuilder.group({
    agentName: '',
    propertyName: '',
    propertyDescription: '',
    price: 0,
    propertyRooms: '',
    propertyStreet: '',
    propertyCity: '',
    propertyRegion: '',
    propertyCountry: '',
    propertyPostal: '',
    propertyX: '',
    propertyY: '',
    propertyVideo: ''
  });

  constructor(
    private propertyService: PropertyService,
    private formBuilder: UntypedFormBuilder,
    private photoService: PhotoService,
    private agentService: AgentService
  ) {
  }

  onSubmit(): void {
    this.setFields();
    this.propertyService.save(this.property).subscribe(
      prop => {
        this.property = prop;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      },
      () => {
        this.setPhotos().subscribe(() => {
          },
          error => {
            console.log(error)
          },
          () => {
            this.createPropertyForm.reset();
            this.fileName = '';
            this.photos = [];
          }
        );
      }
    );
  }

  private setPhotos(): Observable<any> {
    const ids: number[] = [];
    for (const photo of this.photos) {
      ids.push(photo.id);
    }
    return this.propertyService.setPhotos(this.property.id, ids);
  }

  private setFields() {
    this.property.agentName = this.createPropertyForm.value.agentName;
    this.property.name = this.createPropertyForm.value.propertyName;
    this.property.description = this.createPropertyForm.value.propertyDescription;
    this.property.address = {
      id: null,
      street: this.createPropertyForm.value.propertyStreet,
      city: this.createPropertyForm.value.propertyCity,
      region: this.createPropertyForm.value.propertyRegion,
      country: this.createPropertyForm.value.propertyCountry,
      postalCode: this.createPropertyForm.value.propertyPostal,
      latitude: this.createPropertyForm.value.propertyX,
      longitude: this.createPropertyForm.value.propertyY
    };
    this.property.price = this.createPropertyForm.value.price;
    this.property.numberOfRooms = this.createPropertyForm.value.propertyRooms;
    this.property.videoLink = this.createPropertyForm.value.propertyVideo;
    this.property.dateOfAvailability = null;
    this.property.includingUtilities = false;
  }

  onFileSelected($event: Event) {
    const files = ($event.target as HTMLInputElement).files;
    for (let i = 0; i < files.length; ++i) {
      const file = files.item(i);
      this.fileName += file.name + '\n';
      this.photoService.uploadPhoto(file).subscribe(next => {
          if (next) {
            this.photos.push(next);
          }
        },
        error => {
          console.log(error)
        });
    }
    this.fileName += 'DONE!';
  }

  ngOnInit(): void {
    this.agents = this.agentService.agents;
  }
}
