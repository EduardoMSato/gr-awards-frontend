import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { YearWithMultipleWinners } from '../../core/models/movie.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  yearsWithMultipleWinners: YearWithMultipleWinners[] = [];

  constructor(private readonly movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getYearsWithMultipleWinners().subscribe((response) => {
      this.yearsWithMultipleWinners = response.years;
    });
  }
}
