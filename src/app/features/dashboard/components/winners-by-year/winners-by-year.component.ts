import { Component } from '@angular/core';
import { MovieService } from '../../../../core/services/movie.service';
import { Movie } from '../../../../core/models/movie.model';

@Component({
  selector: 'app-winners-by-year',
  templateUrl: './winners-by-year.component.html',
})
export class WinnersByYearComponent {
  searchYear: number | null = null;
  winners: Movie[] = [];

  constructor(private readonly movieService: MovieService) {}

  searchWinners(): void {
    if (!this.searchYear) {
      return;
    }

    this.movieService.getWinnersByYear(this.searchYear).subscribe((response) => {
      this.winners = response.content;
    });
  }
}
