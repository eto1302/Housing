import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LogService} from '../../services/log.service';
import {Log} from '../../models/log';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
  sellForm: FormGroup;

  constructor(private fb: FormBuilder, private logService: LogService) {
    this.sellForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const formValueString = JSON.stringify(this.sellForm.value);
    const log = new Log();
    log.type = 'seller';
    log.text = formValueString;

    this.logService.save(log).subscribe(
      () => {
      },
      (error) => {
        console.log(error);
      }
    );

    this.sellForm.reset();
  }

}
