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
  private loading: boolean = false;
  private toast: string;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  };

  getList() {
    this.loading = true;
    this.itemService.getList(this.dateFrom, this.dateTo).subscribe(
      file => {
        this.loading = false;
        this.downloadFile(file);
        this.showToast('Sarasas sudarytas');
      },
      err =>  {
        this.loading = false;
        this.showToast('Saraso gauti nepavyko');
      }
    );
  };
  
  showToast(message: string) {
    this.toast = message;
    setTimeout(() => { 
      this.toast = undefined;
    }, 2800);
  };

  downloadFile(res: any) {
    const file = new Blob(['\ufeff', res],{ type: 'text/csv' })
    const fileName = `sarasas-${this.dateFrom}-${this.dateTo}`;
    const objectUrl: string = URL.createObjectURL(file);
    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();        
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  };
}

