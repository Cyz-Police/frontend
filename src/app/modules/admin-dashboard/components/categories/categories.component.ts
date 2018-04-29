import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['../../styles.css']
})
export class CategoriesComponent implements OnInit {
  private title = 'Kategorijos';
  private searchValue;

  private categories = ['Telefonai', 'Dviraciai', 'Kompiuteriai'];

  onSearch(message:string):void {
    this.searchValue = message;
  }

  constructor() { }

  ngOnInit() {
  }

}
