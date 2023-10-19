import {Component, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder} from '@angular/forms';
import {PropertyService} from '../../services/property.service';
import {HttpErrorResponse} from '@angular/common/http';
import {PhotoService} from '../../services/photo.service';
import {Observable} from 'rxjs';
import {AgentService} from '../../services/agent-service.service';
import {Property} from "../../models/property";

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit {
  agents;
  fileName = '';
  private property = new Property();
  private photos = [];

  editPropertyForm: FormGroup;

  constructor(
    private propertyService: PropertyService,
    private formBuilder: UntypedFormBuilder,
    private photoService: PhotoService,
    private agentService: AgentService
  ) {
    this.editPropertyForm = this.formBuilder.group({
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
      dateOfAvailability: ''
    });
  }

  onSubmit(): void {
    this.setFields();
    this.propertyService.edit(this.property).subscribe(
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
            this.editPropertyForm.reset();
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
    this.property.agentName = this.editPropertyForm.value.agentName;
    this.property.name = this.editPropertyForm.value.name;
    this.property.description = this.editPropertyForm.value.description;
    this.property.price = this.editPropertyForm.value.price;
    this.property.serviceCosts = this.editPropertyForm.value.serviceCosts;
    this.property.numberOfRooms = this.editPropertyForm.value.numberOfRooms;
    this.property.numberOfBedrooms = this.editPropertyForm.value.numberOfBedrooms;
    this.property.numberOfBathrooms = this.editPropertyForm.value.numberOfBathrooms;
    this.property.numberOfFloors = this.editPropertyForm.value.numberOfFloors;
    this.property.facilities = this.editPropertyForm.value.facilities;
    this.property.interior = this.editPropertyForm.value.interior;
    this.property.livingArea = this.editPropertyForm.value.livingArea;
    this.property.plotArea = this.editPropertyForm.value.plotArea;
    this.property.volume = this.editPropertyForm.value.volume;
    this.property.status = this.editPropertyForm.value.status;
    this.property.typeOfHouse = this.editPropertyForm.value.typeOfHouse;
    this.property.typeOfConstruction = this.editPropertyForm.value.typeOfConstruction;
    this.property.yearOfConstruction = this.editPropertyForm.value.yearOfConstruction;
    this.property.balconyArea = this.editPropertyForm.value.balconyArea;
    this.property.gardenArea = this.editPropertyForm.value.gardenArea;
    this.property.typeOfParking = this.editPropertyForm.value.typeOfParking;
    this.property.address = {
      id: null,
      street: this.editPropertyForm.value.propertyStreet,
      city: this.editPropertyForm.value.propertyCity,
      region: this.editPropertyForm.value.propertyRegion,
      country: this.editPropertyForm.value.propertyCountry,
      postalCode: this.editPropertyForm.value.propertyPostal,
      latitude: this.editPropertyForm.value.propertyX,
      longitude: this.editPropertyForm.value.propertyY,
    };
    this.property.videoLink = this.editPropertyForm.value.videoLink;
    this.property.specifics = this.editPropertyForm.value.specifics;
    this.property.dateOfAvailability = this.editPropertyForm.value.dateOfAvailability;
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

  populateFormFromProperty(): void {
    this.editPropertyForm.setValue({
      agentName: this.property.agentName,
      name: this.property.name,
      description: this.property.description,
      price: this.property.price,
      serviceCosts: this.property.serviceCosts,
      numberOfRooms: this.property.numberOfRooms,
      numberOfBedrooms: this.property.numberOfBedrooms,
      numberOfBathrooms: this.property.numberOfBathrooms,
      numberOfFloors: this.property.numberOfFloors,
      propertyStreet: this.property.address.street,
      propertyCity: this.property.address.city,
      propertyRegion: this.property.address.region,
      propertyCountry: this.property.address.country,
      propertyPostal: this.property.address.postalCode,
      propertyX: this.property.address.latitude,
      propertyY: this.property.address.longitude,
      videoLink: this.property.videoLink,
      facilities: this.property.facilities,
      interior: this.property.interior,
      livingArea: this.property.livingArea,
      plotArea: this.property.plotArea,
      volume: this.property.volume,
      status: this.property.status,
      typeOfHouse: this.property.typeOfHouse,
      typeOfConstruction: this.property.typeOfConstruction,
      yearOfConstruction: this.property.yearOfConstruction,
      balconyArea: this.property.balconyArea,
      gardenArea: this.property.gardenArea,
      typeOfParking: this.property.typeOfParking,
      specifics: this.property.specifics,
      dateOfAvailability: new Date(this.property.dateOfAvailability).toISOString()
        .split('T')[0]
    });
  }


  loadProperty(event: any) {
    const id = event.target.value;

    // Call the propertyService to get the property data based on the id
    this.propertyService.getById(id).subscribe(
      (data) => {
        // Update the property object with the loaded data
        this.property = data;
        this.property.photos = [];
        this.populateFormFromProperty();
      },
      (error) => {
        console.error('Error loading property:', error);
        // Handle the error as needed, e.g., show an error message
      }
    );
  }

  delete() {
    this.propertyService.delete(this.property.id).subscribe(
      result => {
        // console.log('Delete request successful', result);
      },
      error => {
        // console.error('Delete request failed:', error);
      },
      () => {
        this.editPropertyForm.reset();
      }
    );
  }
}
