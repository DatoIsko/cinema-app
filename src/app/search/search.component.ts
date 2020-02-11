import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  @Output() searchChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    fromEvent(
      this.searchInput.nativeElement, 'keyup'
    ).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(
        (event: KeyboardEvent) =>
          (<HTMLInputElement>event.target).value

      )
    ).subscribe(value => this.searchChange.emit(value));
  }

}
