import { Component, OnInit } from '@angular/core';
import { Item } from './../../interfaces/item';
import { ItemService } from './../../services/item.service';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

}
