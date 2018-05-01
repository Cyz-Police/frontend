import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category';
import { LoaderComponent } from './../loader/loader.component';
import { ToastComponent } from './../toast/toast.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  private categories: Category[];
  private newCategory: Category;
  private searchValue: string;
  private timeout;
  private loading: boolean = false;
  private toast: string;
  
  constructor(
    private categoryService: CategoryService
  ) {
    this.newCategory = {
      _id: '',
      title: '',
      isValid: undefined
    }
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.loading = true;
    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.categories = categories;
        this.loading = false;
      }, err => this.handleError()
    );
  }

  onSearch(message:string):void {
    this.searchValue = message;
  }


  onTitleChange(event: any, item: Category) {
    const title = event.target.value;
    if (title.length < 1) {
      item.isValid = false;
      return;
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.loading = true;
      this.categoryService.sendToValidateTitle(title).subscribe(
        res => {
          this.loading = false;
          if (res.error) {
            item.isValid = false;
            this.showToast('Netinkamas kategorijos pavadinimas')
          } else item.isValid = true;
        }, err => this.handleError()
      );
    }, 600);
  }

  onFormTitleInput(event: any, categoryForm: any) {
    const title = event.target.value;
    if (title.length < 1) {
      categoryForm.form.controls['categoryTitle'].setErrors({'incorrect': true});
      return;
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.loading = true;
      this.categoryService.sendToValidateTitle(title).subscribe(
        res => {
          this.loading = false;
          if (res.error) {
            categoryForm.form.controls['categoryTitle'].setErrors({'incorrect': true});
            this.showToast('Netinkamas kategorijos pavadinimas');
          } else categoryForm.form.controls['categoryTitle'].setErrors(null);
        }, err => this.handleError()
      );
    }, 600);
  }

  onFormSubmit(form: any) {
    const title = form.value.categoryTitle;
    form.reset();
    this.loading = true;
    this.categoryService.addNewCategory(title).subscribe(
      res => {
        this.getCategories();
        this.showToast('Kategorija pridėta');
      }, err => this.handleError()
    );
  }
  
  editCategory(category: Category) {
    if (category.isValid) {
      const id = category._id;
      const title = category.title;
      this.loading = true;
      this.categoryService.updateCategory(id, title).subscribe(
        () => {
          this.getCategories();
          this.showToast('Kategorija redaguota')
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
