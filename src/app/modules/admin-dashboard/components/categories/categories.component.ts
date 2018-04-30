import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['../../styles.css']
})
export class CategoriesComponent implements OnInit {
  private title = 'Kategorijos';
  private searchValue;
  private categories: Category[];
  
  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.categories = categories;
        console.log(categories);
      }, err => {
        console.log(err);
      }
    );
  }

  onSearch(message:string):void {
    this.searchValue = message;
  }

}
