import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByName',
})
export class SearchByNamePipe implements PipeTransform {
  transform(lookup: any[], name: any, ...args: any[]): any {
    const splittedName = name ? name.split(/[\.\-_,; ]/) : [];

    return splittedName.length > 0 && lookup
      ? lookup.filter((item: any) =>
          splittedName.some(
            (nameString: string) =>
              item.name.toLowerCase().indexOf(nameString.toLowerCase()) !== -1
          )
        )
      : lookup;
  }
}
