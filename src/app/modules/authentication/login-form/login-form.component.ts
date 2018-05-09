import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from './../../dashboard/components/loader/loader.component';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { AuthenticationService } from './../../../authentication/authentication.service';

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
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onFormSubmit() {
    this.loading = true;
    this.userService.loginUser(this.user).subscribe(
      res => {
        const { token } = res;
        this.authService.setToken(token);
        const { role } = this.authService.getUser(); 
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
            this.router.navigateByUrl('/admin/dashboard');
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
