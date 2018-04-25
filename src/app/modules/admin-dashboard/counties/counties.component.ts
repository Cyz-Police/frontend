import { Component, OnInit } from '@angular/core';
import { CountyService } from './../services/county.service';
import { County } from './../interfaces/county';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

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
      data: this.fb.array([])
    });
  }

  ngOnInit() {
    this.getCounties();
  }

  patchValues() {
    const control = <FormArray>this.countyForm.controls.data;
    this.counties.forEach(x => {
      control.push(this.patchValue(x.title, x._id))
    })
  }
  
  patchValue(title, id) {
    return this.fb.group({
      title: [title],
      id: [id]
    })    
  }

  onSearch(message: string):void {
    this.searchValue = message;
  }
  getCounties() {
    this.loading = true;
    this.countyService.getAllCounties().subscribe(
      counties => {
        this.counties = counties;
        this.patchValues();
        this.loading = false;
      },
      err => {
        this.err = err;
      }
    );
  }

  onTitleChange(event: any, item: County) {
    const title = event.target.value;
    this.countyService.sendToValidate(title).subscribe(
      res => {
        if (res.error) {
          item.isValid = false;
          console.log(this.counties);
        } else item.isValid = true;
        console.log(this.counties);
      }
    );
  }
}
