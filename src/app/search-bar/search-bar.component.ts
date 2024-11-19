import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  @Output() search = new EventEmitter<string>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((term) => {
          if (term.length >= 3) {
            return this.apiService.search(term, 'movie');
          } else {
            return [];
          }
        })
      )
      .subscribe((results) => {
        this.searchResults = results?.results || [];
        this.search.emit(results);
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
