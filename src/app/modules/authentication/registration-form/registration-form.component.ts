import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { County } from './../interfaces/county';
import { CountyService } from './../services/county.service';
import { User } from './../interfaces/user';
import { UserService } from './../services/user.service';
import { LoaderComponent } from './../../dashboard/components/loader/loader.component';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  private newUser: User;
  private counties: County[];
  private success: boolean;
  private error: boolean;
  private timeout;
  private loading;

  constructor(
    private countyService: CountyService,
    private userService: UserService,
    private router: Router
  ) {
    this.newUser = {
      fullName: '',
      email: '',
      county: '',
      password: '',
      rePassword: '',
    };
  }

  ngOnInit() {
    this.getAllCounties();
  }

  onFormSubmit(form: any) {
    this.loading = true;
    this.userService.registerUser(this.newUser).subscribe(
      res => {
        this.loading = false;
        this.success = true;
        setTimeout(() => { 
          this.router.navigateByUrl('/authentication/login');
        }, 2800);
      }, err => {
        this.loading = false;
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 2800)
      }
    );
  }

  getAllCounties() {
    this.countyService.getAllCounties().subscribe(
      counties => this.counties = counties,
      err => this.router.navigateByUrl('/authentication/404')
    );
  }

  onEmailInput(event: any, registrationForm: any) {
    const email = event.target.value;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.userService.validateEmail(email).subscribe(
        res => {
          if (res.error) {
            registrationForm.form.controls['email'].setErrors({'incorrect': true});
          } else registrationForm.form.controls['email'].setErrors(null);
        }, err => alert(err)
      );
    }, 600);
  }

  onPasswordInput(event: any, registrationForm: any) {
    const rePassword = event.target.value;
    const password = registrationForm.value.password
    clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (rePassword !== password) {
          registrationForm.form.controls['rePassword'].setErrors({ 'incorrect': true });
        } else registrationForm.form.controls['rePassword'].setErrors(null);
      }, 800);
  }
}
