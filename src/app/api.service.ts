import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}
  getTopRated(type: string, page: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${type}/top_rated?api_key=${environment.tmdbApiKey}&page=${page}`
    );
  }

  search(query: string, type: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/search/${type}?api_key=${environment.tmdbApiKey}&query=${query}`
    );
  }

  getDetails(type: string, id: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${type}/${id}?api_key=${environment.tmdbApiKey}`
    );
  }
}
