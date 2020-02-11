import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies/movies.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieComponent } from './movie/movie.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { MaterialUIModule } from './shared/material-ui.module';
import { HeaderComponent } from './components/header/header.component';
import { GenrePipe } from './pipes/genre.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { SeatsDialogComponent } from './components/seats-dialog/seats-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieCardComponent,
    SearchComponent,
    MovieComponent,
    HeaderComponent,
    GenrePipe,
    SearchPipe,
    SeatsDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialUIModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
