import { Component, OnInit } from '@angular/core';
import { UserServicesService } from './../services/user-services.service';
import { User } from './../interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  private title = 'Naudotojai';
  private searchValue;
  private users: User[];
  private err;
  private loading: boolean = false;
  private userId;

  private roles = [
    { role: '[USER]', title: 'Darbuotojas' },
    { role: '[ADMIN]', title: 'Virsininkas' },
    { role: '[SUPERADMIN]', title: 'Administratorius' }
  ];

  onSearch(message:string):void {
    this.searchValue = message;
  }

  constructor(
    private userServivces: UserServicesService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getUsers();
  }

  getUsers() {
    return this.userServivces.getAllUsers().subscribe(
      users => {
        this.loading = false;
        this.users = users;
      },
      err => {
        this.loading = false;
        this.err = err;
      }
    )
  }

  changeUserStatus(user: any) {
    if (user.active) {
      this.loading = true;
      this.userServivces.deactivateUser(user._id).subscribe(()=> this.getUsers());
    } else {
      this.loading = true;
      this.userServivces.activateUser(user._id).subscribe(()=>this.getUsers());
    }
  }

  changeUserRole(user: any, event: any) {
    const role = event.target.value;
    if (user.role == role ) return;
    this.loading = true;
    this.userServivces.changeUsersRole(user._id, role).subscribe(() => this.getUsers());
  }
}
