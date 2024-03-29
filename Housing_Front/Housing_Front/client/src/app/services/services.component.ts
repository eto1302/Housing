import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse interdum, velit sit amet aliquam placerat, diam lacus volutpat risus, non tristique libero nunc a sem. Suspendisse leo dui, gravida id lacinia eu, laoreet ac lectus. Mauris sit amet erat a neque fringilla imperdiet. Maecenas a felis nec felis fermentum tincidunt. Aliquam aliquet libero urna, ut condimentum metus luctus a. Sed ut tempus augue, id dictum velit. Donec efficitur, enim eget dapibus eleifend, massa nunc rutrum massa, in faucibus est mi a nisi.\n
    Maecenas commodo augue dolor, eu mattis neque fringilla nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc at tellus maximus, elementum nunc at, convallis augue. Fusce ultricies id leo non rutrum. Fusce vehicula ligula ipsum, at gravida mauris suscipit quis. Nunc vulputate eleifend lorem id molestie. Praesent ac elit feugiat, porta ex quis, aliquet tellus.\n
    Duis ullamcorper erat at lacus finibus, sit amet pulvinar mauris euismod. Quisque nec egestas risus. Phasellus posuere posuere arcu, sed fringilla nibh tristique sed. Sed ultricies sapien suscipit gravida rutrum. Nulla tempus, quam at mattis posuere, risus nunc commodo arcu, non iaculis justo quam ut eros. Praesent ac nunc vitae arcu facilisis tempor sit amet ut erat. Morbi sollicitudin, mi eu feugiat dignissim, elit felis ultrices leo, vel placerat odio dui nec arcu.`;

  services: Service[] = [
    {
      id: 1,
      name: 'Mutual Ground Maintenance',
      photoPath: '../../assets/resources/serviceImages/service1.jpeg',
      description: this.description
    },
    {
      id: 2,
      name: 'Property Maintenance',
      photoPath: '../../assets/resources/serviceImages/service1.jpeg',
      description: this.description
    },
    // Add more services as needed
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirect(s: string) {
    this.router.navigate([s]);
  }
}
