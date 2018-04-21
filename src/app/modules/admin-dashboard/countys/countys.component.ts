import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countys',
  templateUrl: './countys.component.html',
  styleUrls: ['../styles.css']
})
export class CountysComponent implements OnInit {
  private title = 'Apskritys';
  private countys = ['Kaunas', 'Vilnius', 'Klaipeda'];
  private searchValue;

  onSearch(message:string):void {
    this.searchValue = message;
  }

  constructor() { }

  ngOnInit() {
  }

}
