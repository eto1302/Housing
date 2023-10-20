import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogService } from '../../services/log.service';
import { Log } from '../../models/log';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private logService: LogService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const formValueString = JSON.stringify(this.contactForm.value);
    const log = new Log();
    log.type = 'contact';
    log.text = formValueString;

    this.logService.save(log).subscribe(
      () => {
      },
      (error) => {
        console.log(error);
      }
    );

    this.contactForm.reset();
  }
}
