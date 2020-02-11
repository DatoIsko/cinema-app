import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  public movieList;
  public banner;
  public searchPhrase = '';
  public showDropdown = false;
  public readonly genres = [
    'ACTION',
    'ADVENTURES',
    'COMEDY',
    'DRAMA',
    'HORROR',
    'WESTERNS'
  ];

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private movieService: MovieService,
  ) { }

  ngOnInit() {
    this.getMovieList();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getMovieList() {
    this.movieService.getAllMovies().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((movies: any[]) => {
        console.log(movies, 'resss');
        this.movieList = movies.map((ev) => {
          if (Array.isArray(ev.genre_id) && ev.genre_id.length) {
            ev.genres = [];
            ev.genre_id.forEach(el => {
              ev.genres.push(this.genres[el]);
            });
          }
          return ev;
        });

      });
  }

  getMovies(obj) {
    this.movieService.findMovieBy(obj).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((movies: any[]) => {
      this.movieList = movies.map((ev) => {
        if (Array.isArray(ev.genre_id) && ev.genre_id.length) {
          ev.genres = [];
          ev.genre_id.forEach(el => {
            ev.genres.push(this.genres[el]);
          });
        }
        return ev;
      });

    });
  }


  setGenre(genre) {
    this.showDropdown = false;
    const index = this.genres.findIndex((el, idx) => el === genre);

    this.getMovies({ genres: index });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onSearch(value) {
    this.searchPhrase = value;
    this.getMovies({ name: value });
  }
}
