import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usersFilter'
})

export class UsersFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    console.log(items, searchText);
    if(!items) return [];
    if(!searchText) return items;
		searchText = searchText.toLowerCase();
		return items.filter( it => {
      console.log(it);
      return it.fullName.toLowerCase().includes(searchText);
    });
  }
}