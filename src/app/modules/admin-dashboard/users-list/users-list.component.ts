import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() users;

  constructor() { }

  ngOnInit() {
  }

}
