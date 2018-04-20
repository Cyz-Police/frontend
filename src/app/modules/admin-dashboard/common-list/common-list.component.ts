import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-common-list',
  templateUrl: './common-list.component.html',
  styleUrls: ['./common-list.component.css']
})
export class CommonListComponent implements OnInit {
  @Input() values;

  constructor() { }

  ngOnInit() {
  }

}
