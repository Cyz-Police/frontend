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
  private title = 'Apskritys';
  private searchValue;
  private loading: boolean = false;
  private counties: County[];
  private countyTitleQuery: string;
  private countyTitleQueryChanged: Subject<string> = new Subject<string>();

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
  }
}