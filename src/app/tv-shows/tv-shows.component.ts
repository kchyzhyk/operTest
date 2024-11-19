import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ItemListComponent } from '../item-list/item-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tv-shows',
  standalone: true,
  imports: [ItemListComponent, CommonModule],
  templateUrl: './tv-shows.component.html',
  styleUrl: './tv-shows.component.scss',
})
export class TvShowsComponent {
  topTVShows: any[] = [];
  isLoadingTVShows: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTopTVShows();
  }

  loadTopTVShows(): void {
    this.isLoadingTVShows = true;

    this.apiService.getTopRated('tv', 1).subscribe((data) => {
      this.topTVShows = data.results;
      this.isLoadingTVShows = false;
    });
  }
}
