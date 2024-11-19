import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  searchResults: any[] = [];

  private searchSubject: Subject<string> = new Subject<string>();
  @Output() search = new EventEmitter<any[]>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((term) => {
          if (term.length >= 3) {
            return this.apiService.search(term, 'movie').pipe(
              switchMap((movieResults) =>
                this.apiService.search(term, 'tv').pipe(
                  map((tvResults) => ({
                    movies: movieResults?.results || [],
                    tvShows: tvResults?.results || [],
                  }))
                )
              )
            );
          } else {
            return [];
          }
        })
      )
      .subscribe((results) => {
        if (results && results.movies && results.tvShows) {
          this.searchResults = [...results.movies, ...results.tvShows];
          this.searchResults.sort((a, b) => a.title.localeCompare(b.title));
        }
        this.search.emit(this.searchResults);
      });
  }

  ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
  }

  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }

  hideResults(): void {
    this.searchTerm = '';
  }
}
