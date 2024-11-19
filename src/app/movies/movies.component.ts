import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { ItemListComponent } from '../item-list/item-list.component';

@Component({
  selector: 'app-movies-component',
  standalone: true,
  imports: [CommonModule, ItemListComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  topMovies: any[] = [];
  isLoadingMovies: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTopMovies();
  }

  loadTopMovies(): void {
    this.isLoadingMovies = true;

    this.apiService.getTopRated('movie', 1).subscribe((data) => {
      this.topMovies = data.results;
      this.isLoadingMovies = false;
    });
  }
}
