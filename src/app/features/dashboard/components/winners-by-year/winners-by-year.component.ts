import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../../core/services/movie.service';
import { Movie } from '../../../../core/models/movie.model';

interface YearOption {
  label: string;
  value: number;
}

@Component({
  selector: 'app-winners-by-year',
  templateUrl: './winners-by-year.component.html',
})
export class WinnersByYearComponent implements OnInit {
  yearOptions: YearOption[] = [];
  selectedYear: number | null = null;
  winners: Movie[] = [];

  constructor(private readonly movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getWinnerYears().subscribe((years) => {
      this.yearOptions = years.map((year) => ({ label: String(year), value: year }));
    });
  }

  onYearChange(): void {
    if (!this.selectedYear) {
      this.winners = [];
      return;
    }

    this.movieService.getWinnersByYear(this.selectedYear).subscribe((response) => {
      this.winners = response.content;
    });
  }
}
