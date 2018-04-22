import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoriesFilter'
})

export class CommonFilterPipe implements PipeTransform {
  transform(items: any[], categoryId: string): any[] {
    if(!items) return [];
		if(!categoryId) return items;
		if(categoryId === '------') return items;
		return items.filter( it => {
      return it.category.includes(categoryId);
    });
  }
}