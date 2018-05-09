import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../../../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private fullName: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.fullName = this.authService.getUser().fullName;
  }

}
