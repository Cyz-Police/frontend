import { Component, OnInit } from '@angular/core';
import { Item } from './../../interfaces/item';
import { ItemService } from './../../services/item.service';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent implements OnInit {
  private searchValue: string;
  private item: Item;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  search() {
    this.itemService.getById(this.searchValue).subscribe(
      item => {
        this.item = item;
        console.log(this.item);
      }, err => console.log(err)
    );
  }

}
