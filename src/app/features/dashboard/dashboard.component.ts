import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { YearWithMultipleWinners, StudioWinCount } from '../../core/models/movie.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  yearsWithMultipleWinners: YearWithMultipleWinners[] = [];
  topStudios: StudioWinCount[] = [];

  constructor(private readonly movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getYearsWithMultipleWinners().subscribe((response) => {
      this.yearsWithMultipleWinners = response.years;
    });

    this.movieService.getStudiosWithWinCount().subscribe((response) => {
      // API returns all studios; spec requires only top 3
      this.topStudios = response.studios.slice(0, 3);
    });
  }
}
