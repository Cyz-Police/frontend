import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../../authentication/authentication.service';
import { FormsModule } from '@angular/forms';
import { County } from './../interfaces/county';
import { CountyService } from './../services/county.service';
import { User } from './../interfaces/user';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  private user: User;
  private counties: County[];
  private timeout;

  constructor(
    private authService: AuthenticationService,
    private countyService: CountyService,
    private userService: UserService,
  ) {
    this.user = {
      fullName: '',
      email: '',
      county: '',
      password: '',
      rePassword: '',
    }
  }

  ngOnInit() {
    this.getAllCounties();
  }

  onFormSubmit(form: any) {
    console.log(form.value);
  }

  getAllCounties() {
    this.countyService.getAllCounties().subscribe(
      counties => this.counties = counties,
      err => alert('Serverio klaida')
    );
  }

  onEmailInput(event: any, registrationForm: any) {
    const email = event.target.value;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.userService.validateUserEmail(email).subscribe(
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
          registrationForm.form.controls['password'].setErrors({ 'incorrect': true });
        } else registrationForm.form.controls['password'].setErrors(null);
      }, 800);
  }
}
