import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['../../styles.css']
})
export class TypesComponent implements OnInit {
  private title = 'Tipai';
  private filterTitle = 'Kategorija';
  private filterOptions = ['Dviraciai', 'Telefonai'];

  private types = ['iPhone 6s', 'Samsung Galaxy S7', 'Kalnu'];

  constructor() { }

  ngOnInit() {
  }

}
