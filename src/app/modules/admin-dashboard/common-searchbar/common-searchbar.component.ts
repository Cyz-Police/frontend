import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-common-searchbar',
  templateUrl: './common-searchbar.component.html',
  styleUrls: ['./common-searchbar-component.css']
})
export class CommonSearchbarComponent implements OnInit {
  @Output() passSearch: EventEmitter<string> = new EventEmitter<string>();

  onInput(event: any) {
    this.passSearch.emit(event.target.value);
  }

  constructor() { }

  ngOnInit() {
  }

}
