import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  public transform(items: any[], filter: any, property: any): any {
    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item[property] === filter);
  }

}
