import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CountyService } from './../../services/county.service';
import { County } from './../../interfaces/county';
import { ToastComponent } from './../toast/toast.component';


@Component({
  selector: 'app-countys',
  templateUrl: './counties.component.html',
  styleUrls: ['./counties.component.css']
})

export class CountiesComponent implements OnInit {
  private searchValue;
  private loading: boolean = false;
  private message: string;
  private timeout;
  private formIsValid: boolean;
  private newCounty: County;
  private counties: County[];

  constructor(
    private countyService: CountyService
  ) {}

  ngOnInit() {
    this.newCounty = {
      _id: '',
      title: '',
      assignedId: null,
      isValid: undefined
    }
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
      err => this.handleError()
    );
  }

  onTitleChange(event: any, item: County) {
    const title = event.target.value;
    if (title.length < 1) {
      item.isValid = false;
      return;
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.loading = true;
      this.countyService.sendToValidateTitle(title).subscribe(
        res => {
          this.loading = false;
          if (res.error) {
            item.isValid = false;
            this.showToast('Netinkamas apskrities pavadinimas')
          } else item.isValid = true;
        }, err => this.handleError()
      );
    }, 600);
  }

  onFormTitleInput(event: any, countyForm: any) {
    const title = event.target.value;
    if (title.length < 1) {
      countyForm.form.controls['countyTitle'].setErrors({'incorrect': true});
      return;
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.loading = true;
      this.countyService.sendToValidateTitle(title).subscribe(
        res => {
          this.loading = false;
          if (res.error) {
            countyForm.form.controls['countyTitle'].setErrors({'incorrect': true});
            this.showToast('Netinkamas apskrities pavadinimas');
          } else countyForm.form.controls['countyTitle'].setErrors(null);
        }, err => this.handleError()
      );
    }, 600);
  }
  
  onFormIdInput(event: any, countyForm: any) {
    const id = event.target.value;
    if (id.length < 1) {
      countyForm.form.controls['countyId'].setErrors({'incorrect': true});
      return;
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.loading = true;
      this.countyService.sendToValidateId(id).subscribe(
        res => {
          console.log(res);
          this.loading = false;
          if (res.error) {
            countyForm.form.controls['countyId'].setErrors({'incorrect': true});
            this.showToast('Netinkamas apskrities ID');
          } else countyForm.form.controls['countyId'].setErrors(null);
        }, err => this.handleError()
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
          this.showToast('Apskritis redaguota')
        }, err => this.handleError()
      )
    }
  }

  onFormSubmit(form: any) {
    const title = form.value.countyTitle;
    const assignedId = form.value.countyId;
    form.reset();
    this.loading = true;
    this.countyService.addNewCounty(title, assignedId).subscribe(
      () => {
        this.getCounties();
        this.showToast('Apskritis prideta');
      }, err => this.handleError()
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

  handleError() {
    this.loading = false;
    this.showToast('Serverio klaida');
  }
}