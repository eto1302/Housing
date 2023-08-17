import { Component, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterContentInit{
  constructor() { }

  ngAfterContentInit() {
    (() => {
      let nav = document.getElementById('navbar');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 1.5) {
          nav.classList.add('fixed');
          document.body.style.paddingTop = '70';
        } else {
          nav.classList.remove('fixed');
          document.body.style.paddingTop = '0';
        }
      });
      console.log('Listener added');
    })()
  }
}
