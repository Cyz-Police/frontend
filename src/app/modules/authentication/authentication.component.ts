import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  template: 
  `<app-header></app-header>
  <router-outlet></router-outlet>`
})
export class AuthenticationComponent implements OnInit {
  ngOnInit() {}
}
