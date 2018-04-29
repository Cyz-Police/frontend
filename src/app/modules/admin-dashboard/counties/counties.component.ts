import { Component, OnInit } from '@angular/core';
import { CountyService } from './../services/county.service';
import { County } from './../interfaces/county';
import { Subject } from 'rxjs/Subject';
import {Observable} from  "rxjs/Rx";

@Component({
  selector: 'app-countys',
  templateUrl: './counties.component.html',
  styleUrls: ['./counties.component.css']
})

export class CountiesComponent implements OnInit {
  private searchValue;
  private loading: boolean = false;
  private counties: County[];
  private timeout;

  constructor(
    private countyService: CountyService,
  ) {}

  ngOnInit() {
    this.getCounties();
  }

  onSearch(message: string):void {
    this.searchValue = message;
  }

  getCounties() {
    this.loading = true;
    this.countyService.getAllCounties().subscribe(
      counties => {
        this.counties = counties;
        this.loading = false;
      },
      err => {
      }
    );
  }

  onTitleChange(event: any, item: County) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const title = event.target.value;
      this.loading = true;
      this.countyService.sendToValidate(title).subscribe(
        res => {
          this.loading = false;
          if (res.error) {
            item.isValid = false;
          } else item.isValid = true;
        }
      );
    }, 600);
  }

  editCounty(county: County) {
    if (county.isValid) {
      const Id = county._id;
      const title = county.title;
      this.loading = true;
      this.countyService.updateCounty(Id, title).subscribe(
        () => {
          this.getCounties();
        }
      )
    }
  }
}