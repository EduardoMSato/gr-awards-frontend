import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import {
  YearWithMultipleWinners,
  StudioWinCount,
  ProducerWinInterval,
} from '../../core/models/movie.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  yearsWithMultipleWinners: YearWithMultipleWinners[] = [];
  topStudios: StudioWinCount[] = [];
  maxProducerIntervals: ProducerWinInterval[] = [];
  minProducerIntervals: ProducerWinInterval[] = [];

  constructor(private readonly movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getYearsWithMultipleWinners().subscribe((response) => {
      this.yearsWithMultipleWinners = response.years;
    });

    this.movieService.getStudiosWithWinCount().subscribe((response) => {
      // API returns all studios; spec requires only top 3
      this.topStudios = response.studios.slice(0, 3);
    });

    this.movieService.getMaxMinWinIntervalForProducers().subscribe((response) => {
      this.maxProducerIntervals = response.max;
      this.minProducerIntervals = response.min;
    });
  }
}
