import { Component, OnInit } from '@angular/core';
import { UserServicesService } from './../../services/user-services.service';
import { CountyService } from './../../services/county.service';
import { ToastComponent } from './../toast/toast.component';
import { User } from './../../interfaces/user';
import { County } from './../../interfaces/county';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  private users: User[];
  private counties: County[];
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
    private countyService: CountyService
  ) { }

  ngOnInit() {
    this.getCounties();
    this.getUsers();
  }
  
  onSearch(text: string):void {
    this.searchValue = text;
  }

  onCountyChange(user: User, event: any) {
    const countyId = event.target.value;
    this.selectedCounty = countyId;
  }

  getCounties() {
    this.loading = true;
    this.countyService.getAllCounties().subscribe(
      counties => {
        this.counties = counties;
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.showToast('Serveris nepasiekiamas');
      }
    );
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

  changeUserRole(user: any, event: any) {
    const role = event.target.value;
    if (user.role == role ) return;
    this.loading = true;
    this.userServivces.changeUsersRole(user._id, role).subscribe(
      () => {
        this.getUsers();
        this.showToast('Naudotojo rolė paskeista');
      }, err =>  {
        this.loading = false;
        this.showToast('Rolės pakeisti nepavyko');
      }
    );
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
