import { Component, OnInit } from '@angular/core';
import {FormBuilder } from '@angular/forms';
import {PropertyService} from '../../services/property.service';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent {
  agents = [
    {
      name: 'Силвия Гочева'
    },
    {
      name: 'Agent 1'
    },
    {
      name: 'Agent 2'
    }
  ];
  fileName = '';

  createPropertyForm = this.formBuilder.group({
    agentName: [],
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
    private formBuilder: FormBuilder,
  ) {}

  onSubmit(): void {
    const property = {
      id: null,
      agentName: this.createPropertyForm.value.agentName,
      name: this.createPropertyForm.value.propertyName,
      description: this.createPropertyForm.value.propertyDescription,
      address: {
        id: null,
        street: this.createPropertyForm.value.propertyStreet,
        city: this.createPropertyForm.value.propertyCity,
        region: this.createPropertyForm.value.propertyRegion,
        country: this.createPropertyForm.value.propertyCountry,
        postalCode: this.createPropertyForm.value.propertyPostal,
        latitude: this.createPropertyForm.value.propertyX,
        longitude: this.createPropertyForm.value.propertyY
      },
      price: this.createPropertyForm.value.price,
      numberOfRooms: this.createPropertyForm.value.propertyRooms,
      videoLink: this.createPropertyForm.value.propertyVideo,
      dateOfAvailability: null,
      photos: [],
      includingUtilities: false
    };
    this.propertyService.save(property);
    console.warn('Property Saved!', property);
    console.warn('Property in JSON: ', JSON.stringify(property, null, 2));
    this.createPropertyForm.reset();
  }
}
