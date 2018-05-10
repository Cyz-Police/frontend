import { Component, OnInit } from '@angular/core';
import { UserServicesService } from './../../services/user-services.service';
import { ToastComponent } from './../toast/toast.component';
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
  private message: string;

  private roles = [
    { role: '[USER]', title: 'Darbuotojas' },
    { role: '[ADMIN]', title: 'Viršininkas' },
    { role: '[SUPERADMIN]', title: 'Administratorius' }
  ];

  constructor(
    private userServivces: UserServicesService,
  ) { }

  ngOnInit() {
    this.getUsers();
  }
  
  onSearch(text: string):void {
    this.searchValue = text;
  }

  onCountyChange(user: User, event: any) {
    const countyId = event.target.value;
    this.selectedCounty = countyId;
  }

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
  }

  changeUserStatus(user: any) {
    if (user.active) {
      this.loading = true;
      this.userServivces.deactivateUser(user._id).subscribe(
        () => {
          this.getUsers();
          this.showToast('Naudotojas deaktyvuotas')
        }, err =>  {
          this.loading = false;
          this.showToast('Naudotojo deaktyvuoti nepavyko');
        }
      );
    } else {
      this.loading = true;
      this.userServivces.activateUser(user._id).subscribe(
        () => {
          this.getUsers();
          this.showToast('Naudotojas aktyvuotas')
        }, err => {
          this.loading = false;
          this.showToast('Nepavyko aktyvuoti naudotojo');
        }
      );
    }
  }

  showToast(message: string) {
    this.message = message;
    console.log(this.message);
    setTimeout(() => { 
      this.message = undefined;
        console.log(this.message);
    }, 2800);
  }
}
