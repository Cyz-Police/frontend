import { Component, OnInit } from '@angular/core';
import { UserServicesService } from './../../services/user-services.service';
import { User } from './../../interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  private users: User[];
  private searchValue;
  private selectedCounty;
  private loading: boolean = false;
  private toast: string;

  constructor(
    private userServivces: UserServicesService,
  ) { };

  ngOnInit() {
    this.getUsers();
  };
  
  onSearch(text: string):void {
    this.searchValue = text;
  };

  getUsers() {
    this.loading = true;
    return this.userServivces.getAllUsers().subscribe(
      users => {
        this.users = users;
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.showToast('Serveris nepasiekiamas');
      }
    )
  };

  changeUserStatus(user: User) {
    if (user.active) {
      this.loading = true;
      this.userServivces.deactivateUser(user._id).subscribe(
        () => {
          this.getUsers();
          this.showToast('Darbuotojas deaktyvuotas')
        }, err =>  {
          this.loading = false;
          this.showToast('Darbuotojo deaktyvuoti nepavyko');
        }
      );
    } else {
      this.loading = true;
      this.userServivces.activateUser(user._id).subscribe(
        () => {
          this.getUsers();
          this.showToast('Darbuotojas aktyvuotas')
        }, err => {
          this.loading = false;
          this.showToast('Darbuotojo aktyvuoti nepavyko');
        }
      );
    }
  };

  showToast(message: string) {
    this.toast = message;
    setTimeout(() => { 
      this.toast = undefined;
    }, 2800);
  };
}
