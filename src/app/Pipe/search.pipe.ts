import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(item:any, searchString: string) {
    if(!item) return []
    if(!searchString) return item

    searchString = searchString.toLowerCase()
    const filterNotes=item.filter((item: {title: string, description: string}) => item.title.toLowerCase().includes(searchString) || item.description.toLowerCase().includes(searchString));
    console.log(filterNotes);
    return filterNotes
  }

}
