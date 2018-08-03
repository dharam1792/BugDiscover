import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any, filter: any): any {
        if (filter && Array.isArray(items)) {
            let filterKeys = Object.keys(filter);
            return items.filter(item =>
                filterKeys.reduce((memo, keyName) =>
                    (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
        } else {
            return items;
        }
      }
}

@Pipe({
    name: 'findFilter'
  })
  export class FindFilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
      if (!items) return [];
      if (!searchText) return items;
      searchText = searchText.toLowerCase();
      return items.filter(it => {
        return JSON.stringify(it).toLowerCase().includes(searchText);
      });
    }
  }