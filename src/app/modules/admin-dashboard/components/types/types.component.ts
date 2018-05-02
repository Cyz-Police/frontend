import { Component, OnInit } from '@angular/core';
import { Type } from '../../interfaces/type';
import { Category } from './../../interfaces/category';
import { TypeService } from './../../services/type.service';
import { LoaderComponent } from './../loader/loader.component';
import { ToastComponent } from './../toast/toast.component';
import { CategoryService } from './../../services/category.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {
  private types: Type[];
  private categories: Category[];
  private newType: Type;
  private searchValue: string;
  private timeout;
  private loading: boolean = false;
  private toast: string;

  constructor(
    private typeService: TypeService,
    private categoryService: CategoryService
  ) {
    this.newType = {
      _id: '',
      title: '',
      category: '',
      isValid: undefined
    }
  }

  ngOnInit() {
    this.getCategories();
    this.getTypes();
  }

  getCategories() {
    this.loading = true;
    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.categories = categories;
        this.loading = false;
      }, err => this.handleError
    );
  }

  getTypes() {
    this.loading = true;
    this.typeService.getAllTypes().subscribe(
      types => {
        this.types = types;
        this.loading = false;
      }, err => this.handleError()
    );
  }

  onSearch(message:string):void {
    this.searchValue = message;
  }

  onTitleChange(event: any, item: Type) {
    const title = event.target.value;
    if (title.length < 1) {
      item.isValid = false;
      return;
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.loading = true;
      this.typeService.sendToValidateTitle(title).subscribe(
        res => {
          this.loading = false;
          if (res.error) {
            item.isValid = false;
            this.showToast('Netinkamas tipo pavadinimas')
          } else item.isValid = true;
        }, err => this.handleError()
      );
    }, 600);
  }

  onFormTitleInput(event: any, typeForm: any) {
    const title = event.target.value;
    if (title.length < 1) {
      typeForm.form.controls['typeTitle'].setErrors({'incorrect': true});
      return;
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.loading = true;
      this.typeService.sendToValidateTitle(title).subscribe(
        res => {
          this.loading = false;
          if (res.error) {
            typeForm.form.controls['typeTitle'].setErrors({'incorrect': true});
            this.showToast('Netinkamas tipo pavadinimas');
          } else typeForm.form.controls['typeTitle'].setErrors(null);
        }, err => this.handleError()
      );
    }, 600);
  }

  onFormSubmit(form: any) {
    const title = form.value.typeTitle;
    const categoryId = form.value.categoryTitle;
    form.reset();
    this.loading = true;
    this.typeService.addNewType(title, categoryId).subscribe(
      res => {
        this.getTypes();
        this.showToast('Tipas pridėtas');
      }, err => this.handleError()
    );
  }
  
  editType(type: Type) {
    if (type.isValid) {
      const id = type._id;
      const title = type.title;
      this.loading = true;
      this.typeService.updateType(id, title).subscribe(
        res => {
          this.getTypes();
          this.showToast('Tipas redaguotas');
        }, err => this.handleError()
      )
    }
  }

  showToast(message: string) {
    this.toast = message;
    setTimeout(() => { 
      this.toast = undefined;
    }, 2800);
  }

  handleError() {
    this.loading = false;
    this.toast = "Serverio klaida";
  }
}
