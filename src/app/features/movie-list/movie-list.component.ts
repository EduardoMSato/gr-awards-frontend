import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../core/models/movie.model';

interface WinnerOption {
  label: string;
  value: boolean | undefined;
}

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  totalRecords = 0;
  rows = 15;
  loading = true;

  filterYear: number | null = null;
  filterWinner: boolean | undefined;

  winnerOptions: WinnerOption[] = [
    { label: 'Yes/No', value: undefined },
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];

  constructor(private readonly movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies({ first: 0, rows: this.rows });
  }

  loadMovies(event: LazyLoadEvent): void {
    this.loading = true;
    const page = (event.first ?? 0) / (event.rows ?? this.rows);
    const size = event.rows ?? this.rows;

    this.movieService
      .getMovies(page, size, this.filterWinner, this.filterYear ?? undefined)
      .subscribe((response) => {
        this.movies = response.content;
        this.totalRecords = response.totalElements;
        this.loading = false;
      });
  }

  applyFilters(): void {
    this.loadMovies({ first: 0, rows: this.rows });
  }
}
