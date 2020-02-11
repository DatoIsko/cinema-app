import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {

  public readonly GENRES = [
    'ACTION',
    'ADVENTURES',
    'COMEDY',
    'DRAMA',
    'HORROR',
    'WESTERNS'
  ];

  transform(value: number[]): string {
    if (Array.isArray(value) && value.length) {
      return value.map((item) => this.GENRES[item]).join(', ');
    }
    return null;
  }
}
