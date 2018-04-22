import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usersFilter'
})

export class UsersFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
		searchText = searchText.toLowerCase();
		return items.filter( it => {
      return it.fullName.toLowerCase().includes(searchText);
    });
  }
}