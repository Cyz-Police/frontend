import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private dateFrom: Date;
  private dateTo: Date;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  getList() {
    this.itemService.getList(this.dateFrom, this.dateTo).subscribe(
      file => {
        const fileName = `sarasas-${this.dateFrom}-${this.dateTo}.csv`;
        const objectUrl: string = URL.createObjectURL(file);
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        a.href = objectUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();        
    
        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
      },
      err => alert(err)
    );
  }

}
