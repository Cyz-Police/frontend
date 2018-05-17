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
  private loading: boolean;
  private toast: string;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  search() {
    if (this.searchValue.length === 11) {
      this.loading = true;
      this.itemService.getById(this.searchValue).subscribe(
        item => {
          console.log(item);
          if (item != null) {
            this.loading = false;
            this.item = item;
            this.showToast('Paieška sėkminga');
          } else this.handleError() 
        }, err => this.handleError()
      );
    } else this.showToast('Netinkamas kodas');
  };

  handleError() {
    this.item = undefined;
    this.loading = false;
    this.showToast('Paieška nesėkminga');
  }
  
  showToast(message: string) {
    this.toast = message;
    setTimeout(() => { 
      this.toast = undefined;
    }, 2800);
  };
}
