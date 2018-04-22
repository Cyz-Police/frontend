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
  private loading;
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

  async ngOnInit() {
    this.loading = true;
    console.log('loading');
    await this.getUsers();
    this.loading = false;
    console.log('loaded');
  }

  getUsers() {
    return this.userServivces.getAllUsers().subscribe(
      users => {
        this.users = users;
      },
      err => {
        this.err = err;
      }
    )
  }

  async changeUserStatus(user: any) {
    if (user.active) {
      await this.userServivces.deactivateUser(user._id).subscribe();
    } else {
      await this.userServivces.activateUser(user._id).subscribe();
    }
    this.getUsers();
  }

  async changeUserRole(user: any, event: any) {
    const role = event.target.value;
    if (user.role == role ) return;
    await this.userServivces.changeUsersRole(user._id, role).subscribe();
    this.getUsers();
  }
}
