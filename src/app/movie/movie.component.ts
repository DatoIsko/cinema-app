import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SeatsDialogComponent } from '../components/seats-dialog/seats-dialog.component';
import { Subject } from 'rxjs';
import { GENRES } from '../models/genre';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {

  pageIsReady = false;
  movie: any;
  private ngUnsubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.movieService.getMovieById(params.get('id'))),
      takeUntil(this.ngUnsubscribe)
    ).subscribe((movie: any) => {
      this.pageIsReady = true;
      if (Array.isArray(movie.genre_id) && movie.genre_id.length) {
        movie.genres = [];
        movie.genre_id.forEach(el => {
          movie.genres.push(GENRES[el]);
        });
      }
      this.movie = movie;
    });
  }

  openDialog(): void {
    this.movieService.getSessionsByMovieId(this.movie._id)
      .pipe(
        switchMap((data: any) => {
          const dialogRef = this.dialog.open(SeatsDialogComponent, {
            disableClose: true,
            width: '500px',
            data: {
              ...data,
              movieTitle: this.movie.name
            }
          });
          return dialogRef.afterClosed();
        }),
        switchMap((seats) => {
          const places = seats.map((st) => st.seat._id);
          const body = {
            movieShow_id: this.movie._id, // string,
            places,
            // row_id: 1, // number,
            // place_position: 2, // number,
            // isFree: true
          };
          return this.movieService.bookTicket(body);
        }),
        takeUntil(this.ngUnsubscribe)
      ).subscribe();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
