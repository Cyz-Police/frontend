import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../styles.css']
})
export class UsersComponent implements OnInit {
  private title = 'Naudotojai';
  private users = [
    { fullName: 'Dominykas Seputis', role: 'Adminstratorius'},
    { fullName: 'Povilas Povilaitis', role: 'Valdytojas'},
    { fullName: 'Loreta Seputiene', role: 'Adminstratorius'},
    { fullName: 'Saule Seputyte', role: 'Valdytojas'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
