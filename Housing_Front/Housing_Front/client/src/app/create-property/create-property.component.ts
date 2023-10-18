import {Component, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder} from '@angular/forms';
import {PropertyService} from '../../services/property.service';
import {HttpErrorResponse} from '@angular/common/http';
import {PhotoService} from '../../services/photo.service';
import {Observable} from 'rxjs';
import {AgentService} from '../../services/agent-service.service';
import {Property} from '../../models/property';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent implements OnInit {
  agents;
  fileName = '';
  private property = new Property();
  private photos = [];

  createPropertyForm: FormGroup;

  constructor(
    private propertyService: PropertyService,
    private formBuilder: UntypedFormBuilder,
    private photoService: PhotoService,
    private agentService: AgentService
  ) {
    this.createPropertyForm = this.formBuilder.group({
      agentName: '',
      name: '',
      description: '',
      price: 0,
      serviceCosts: 0,
      numberOfRooms: '',
      numberOfBedrooms: 0,
      numberOfBathrooms: 0,
      numberOfFloors: 0,
      facilities: '',
      interior: '',
      livingArea: 0,
      plotArea: 0,
      volume: 0,
      status: '',
      typeOfHouse: '',
      typeOfConstruction: '',
      yearOfConstruction: 0,
      balconyArea: 0,
      gardenArea: 0,
      typeOfParking: '',
      propertyStreet: '',
      propertyCity: '',
      propertyRegion: '',
      propertyCountry: '',
      propertyPostal: '',
      propertyX: '',
      propertyY: '',
      videoLink: '',
      specifics: '',
      dateOfAvailability: '',
    });
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
    this.property.name = this.createPropertyForm.value.name;
    this.property.description = this.createPropertyForm.value.description;
    this.property.price = this.createPropertyForm.value.price;
    this.property.serviceCosts = this.createPropertyForm.value.serviceCosts;
    this.property.numberOfRooms = this.createPropertyForm.value.numberOfRooms;
    this.property.numberOfBedrooms = this.createPropertyForm.value.numberOfBedrooms;
    this.property.numberOfBathrooms = this.createPropertyForm.value.numberOfBathrooms;
    this.property.numberOfFloors = this.createPropertyForm.value.numberOfFloors;
    this.property.facilities = this.createPropertyForm.value.facilities;
    this.property.interior = this.createPropertyForm.value.interior;
    this.property.livingArea = this.createPropertyForm.value.livingArea;
    this.property.plotArea = this.createPropertyForm.value.plotArea;
    this.property.volume = this.createPropertyForm.value.volume;
    this.property.status = this.createPropertyForm.value.status;
    this.property.typeOfHouse = this.createPropertyForm.value.typeOfHouse;
    this.property.typeOfConstruction = this.createPropertyForm.value.typeOfConstruction;
    this.property.yearOfConstruction = this.createPropertyForm.value.yearOfConstruction;
    this.property.balconyArea = this.createPropertyForm.value.balconyArea;
    this.property.gardenArea = this.createPropertyForm.value.gardenArea;
    this.property.typeOfParking = this.createPropertyForm.value.typeOfParking;
    this.property.address = {
      id: null,
      street: this.createPropertyForm.value.propertyStreet,
      city: this.createPropertyForm.value.propertyCity,
      region: this.createPropertyForm.value.propertyRegion,
      country: this.createPropertyForm.value.propertyCountry,
      postalCode: this.createPropertyForm.value.propertyPostal,
      latitude: this.createPropertyForm.value.propertyX,
      longitude: this.createPropertyForm.value.propertyY,
    };
    this.property.videoLink = this.createPropertyForm.value.videoLink;
    this.property.specifics = this.createPropertyForm.value.specifics;
    this.property.dateOfAvailability = this.createPropertyForm.value.dateOfAvailability;
    this.property.dateOfOffer = new Date();
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
