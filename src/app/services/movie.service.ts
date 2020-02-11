import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { removeEmptyProperties } from '../utils/util';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private api = 'https://cinema-api-test.herokuapp.com';
  readonly GENRES = [
    'ACTION',
    'ADVENTURES',
    'COMEDY',
    'DRAMA',
    'HORROR',
    'WESTERNS'
  ];

  constructor(
    private http: HttpClient
  ) { }

  getAllMovies() {
    return this.http.get(`${this.api}/movies`);
  }

  getMovieById(id) {
    return this.http.get(`${this.api}/movies?movie_id=${id}`);
  }

  getAllMoviesSessions() {
    return this.http.get(`${this.api}/movieShows`).pipe()
      .subscribe((data) => {
        console.log(data);

        return data;
      });
  }

  getSessionsByMovieId(movieId) {
    return this.http.get(`${this.api}/movieShows?movie_id=${movieId}`);
  }

  findMovieBy(obj) {
    const params = new HttpParams({ fromObject: removeEmptyProperties(obj) });

    return this.http.get(`${this.api}/movies/find`, { params });
  }

  bookTicket(body) {
    return this.http.post(`${this.api}/bookingPlace`, { body });
  }

}
