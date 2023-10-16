import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder} from '@angular/forms';
import {PropertyService} from '../../services/property.service';
import {HttpErrorResponse} from '@angular/common/http';
import {PhotoService} from '../../services/photo.service';
import {Observable} from 'rxjs';
import {AgentService} from '../../services/agent-service.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit {
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
    dateOfAvailability: null,
    photos: [],
    includingUtilities: false
  };
  private photos = [];

  editPropertyForm = this.formBuilder.group({
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
    this.property.name = this.editPropertyForm.value.propertyName;
    this.property.description = this.editPropertyForm.value.propertyDescription;
    this.property.address = {
      id: null,
      street: this.editPropertyForm.value.propertyStreet,
      city: this.editPropertyForm.value.propertyCity,
      region: this.editPropertyForm.value.propertyRegion,
      country: this.editPropertyForm.value.propertyCountry,
      postalCode: this.editPropertyForm.value.propertyPostal,
      latitude: this.editPropertyForm.value.propertyX,
      longitude: this.editPropertyForm.value.propertyY
    };
    this.property.price = this.editPropertyForm.value.price;
    this.property.numberOfRooms = this.editPropertyForm.value.propertyRooms;
    this.property.videoLink = this.editPropertyForm.value.propertyVideo;
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

  populateFormFromProperty(): void {
    this.editPropertyForm.setValue({
      agentName: this.property.agentName,
      propertyName: this.property.name,
      propertyDescription: this.property.description,
      price: this.property.price,
      propertyRooms: this.property.numberOfRooms,
      propertyStreet: this.property.address.street,
      propertyCity: this.property.address.city,
      propertyRegion: this.property.address.region,
      propertyCountry: this.property.address.country,
      propertyPostal: this.property.address.postalCode,
      propertyX: this.property.address.latitude,
      propertyY: this.property.address.longitude,
      propertyVideo: this.property.videoLink,
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
