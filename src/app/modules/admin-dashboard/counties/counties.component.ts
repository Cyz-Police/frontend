import { Component, OnInit } from '@angular/core';
import { CountyService } from './../services/county.service';
import { County } from './../interfaces/county';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-countys',
  templateUrl: './counties.component.html',
  styleUrls: ['./counties.component.css']
})
export class CountiesComponent implements OnInit {
  private title = 'Apskritys';
  private searchValue;
  private err;
  private loading: boolean = false;
  private canUpdate: boolean;
  private counties: County[];
  private countyForm: FormGroup;

  constructor(
    private countyService: CountyService,
    private fb: FormBuilder
  ) { this.createForm() }

  createForm() {
    this.countyForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

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
        this.err = err;
      }
    );
  }

  onTitleChange(event: any) {
    const title = event.target.value;
    this.countyService.sendToValidate(title).subscribe(
      res => {
        if (res.error) {
          this.canUpdate = false;
        } else this.canUpdate = true;
      }
    );
  }
}
