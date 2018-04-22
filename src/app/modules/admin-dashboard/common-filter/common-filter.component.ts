import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-common-filter',
  templateUrl: './common-filter.component.html',
  styleUrls: ['./common-filter.component.css']
})
export class CommonFilterComponent implements OnInit {
  @Input() options;
  @Input() title;
  @Output() selectedValue: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onChange(event: any) {
    this.selectedValue.emit(event.target.value);
  }

}
