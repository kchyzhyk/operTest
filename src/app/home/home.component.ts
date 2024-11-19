import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ItemListComponent } from '../item-list/item-list.component';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from '../movies/movies.component';
import { TvShowsComponent } from '../tv-shows/tv-shows.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ItemListComponent, CommonModule, MoviesComponent, TvShowsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  topMovies: any[] = [];
  topTVShows: any[] = [];
  isLoadingMovies: boolean = false;
  isLoadingTVShows: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTopMovies();
    this.loadTopTVShows();
  }

  loadTopMovies(): void {
    this.isLoadingMovies = true;

    this.apiService.getTopRated('movie', 1).subscribe((data) => {
      this.topMovies = data.results;
      this.isLoadingMovies = false;
    });
  }

  loadTopTVShows(): void {
    this.isLoadingTVShows = true;

    this.apiService.getTopRated('tv', 1).subscribe((data) => {
      this.topTVShows = data.results;
      this.isLoadingTVShows = false;
    });
  }
}
