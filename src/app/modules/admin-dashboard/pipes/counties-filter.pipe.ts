import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countiesFilter'
})

export class CommonFilterPipe implements PipeTransform {
  transform(items: any[], countyId: string): any[] {
    if(!items) return [];
    if(!countyId) return items;
		return items.filter( it => {
      return it.county.includes(countyId);
    });
  }
}