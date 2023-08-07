import { Component, OnInit } from '@angular/core';
import {FormBuilder } from '@angular/forms';
import {PropertyService} from '../../services/property.service';
import {Property} from "../../models/property";
import {Address} from "../../models/address";

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent {

  createPropertyForm = this.formBuilder.group({
    agentName: [],
    propertyName: '',
    propertyDescription: '',
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
    let property = {
      agentName: this.createPropertyForm.value.agentName,
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345"
      }
    };
    this.propertyService.save(this.createPropertyForm.value);
    console.warn('Property Saved!', this.createPropertyForm.value);
    console.warn('Property in JSON: ', JSON.stringify(this.createPropertyForm.value, null, 2));
    this.createPropertyForm.reset();
  }

}
