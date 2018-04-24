import { Component, OnInit, Input, Pipe, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-common-list',
  templateUrl: './common-list.component.html',
  styleUrls: ['./common-list.component.css']
})
export class CommonListComponent implements OnInit {
  @Input() values;
  @Input() searchValue;
  @Output() passTitle: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onKeyUp(event: any) {
    this.passTitle.emit(event.target.value);
  }
}