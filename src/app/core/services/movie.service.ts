import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MoviePage,
  YearsWithMultipleWinnersResponse,
  StudiosWithWinCountResponse,
  MaxMinWinIntervalResponse,
} from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private readonly http: HttpClient) {}

  getMovies(page: number, size: number, winner?: boolean, year?: number): Observable<MoviePage> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (winner !== undefined && winner !== null) {
      params = params.set('winner', winner);
    }

    if (year) {
      params = params.set('year', year);
    }

    return this.http.get<MoviePage>('', { params });
  }

  getYearsWithMultipleWinners(): Observable<YearsWithMultipleWinnersResponse> {
    return this.http.get<YearsWithMultipleWinnersResponse>('/yearsWithMultipleWinners');
  }

  getStudiosWithWinCount(): Observable<StudiosWithWinCountResponse> {
    return this.http.get<StudiosWithWinCountResponse>('/studiosWithWinCount');
  }

  getMaxMinWinIntervalForProducers(): Observable<MaxMinWinIntervalResponse> {
    return this.http.get<MaxMinWinIntervalResponse>('/maxMinWinIntervalForProducers');
  }

  getWinnersByYear(year: number): Observable<MoviePage> {
    const params = new HttpParams()
      .set('winner', true)
      .set('year', year)
      .set('page', 0)
      .set('size', 99);
    return this.http.get<MoviePage>('', { params });
  }
}
