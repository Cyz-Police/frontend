import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../../authentication/authentication.service';
import { LoaderComponent } from './../../dashboard/components/loader/loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  private loading: boolean;
  private error: boolean;
  private success: boolean; 
  private user = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onFormSubmit() {
    this.loading = true;
    const { email, password } = this.user;
    this.authService.loginUser(email, password).subscribe(
      res => {
        const { role } = res;
        if (role === '[USER]') {
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 2800)
          this.loading = false;
        } else if (role === '[ADMIN]') {
          this.success = true;
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard');
          }, 1500)
        } else if (role === '[SUPERADMIN]') {
          this.success = true;
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard');
          }, 1500)
        }
      },
      err => {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 2800)
        this.loading = false;
      }
    );
  }

}
