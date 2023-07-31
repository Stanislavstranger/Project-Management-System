import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../models/models';

@Pipe({
  name: 'filterBoards',
})
export class FilterBoardsPipe implements PipeTransform {
  transform(boards: Board[], search: string): Board[] {
    if (search.length === 0) return boards;
    return boards.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }
}
