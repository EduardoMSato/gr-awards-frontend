import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DashboardComponent } from './dashboard.component';
import { YearsMultipleWinnersComponent } from './components/years-multiple-winners/years-multiple-winners.component';
import { TopStudiosComponent } from './components/top-studios/top-studios.component';
import { ProducerWinIntervalComponent } from './components/producer-win-interval/producer-win-interval.component';
import { WinnersByYearComponent } from './components/winners-by-year/winners-by-year.component';
import { MovieService } from '../../core/services/movie.service';
import {
  YearsWithMultipleWinnersResponse,
  StudiosWithWinCountResponse,
  MaxMinWinIntervalResponse,
} from '../../core/models/movie.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  const mockYears: YearsWithMultipleWinnersResponse = {
    years: [
      { year: 1986, winnerCount: 2 },
      { year: 1990, winnerCount: 3 },
    ],
  };

  const mockStudios: StudiosWithWinCountResponse = {
    studios: [
      { name: 'Columbia', winCount: 7 },
      { name: 'Paramount', winCount: 6 },
      { name: 'Warner', winCount: 5 },
      { name: 'Fox', winCount: 4 },
    ],
  };

  const mockIntervals: MaxMinWinIntervalResponse = {
    max: [{ producer: 'Matthew Vaughn', interval: 13, previousWin: 2002, followingWin: 2015 }],
    min: [{ producer: 'Joel Silver', interval: 1, previousWin: 1990, followingWin: 1991 }],
  };

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', [
      'getYearsWithMultipleWinners',
      'getStudiosWithWinCount',
      'getMaxMinWinIntervalForProducers',
      'getWinnerYears',
    ]);
    movieServiceSpy.getYearsWithMultipleWinners.and.returnValue(of(mockYears));
    movieServiceSpy.getStudiosWithWinCount.and.returnValue(of(mockStudios));
    movieServiceSpy.getMaxMinWinIntervalForProducers.and.returnValue(of(mockIntervals));
    movieServiceSpy.getWinnerYears.and.returnValue(of([1986, 1990]));

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        CardModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
      ],
      declarations: [
        DashboardComponent,
        YearsMultipleWinnersComponent,
        TopStudiosComponent,
        ProducerWinIntervalComponent,
        WinnersByYearComponent,
      ],
      providers: [{ provide: MovieService, useValue: movieServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 4 panels', () => {
    expect(fixture.nativeElement.querySelector('app-years-multiple-winners')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-top-studios')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-producer-win-interval')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-winners-by-year')).toBeTruthy();
  });

  it('should use a 2-column grid layout', () => {
    const grid = fixture.nativeElement.querySelector('.grid');
    expect(grid).toBeTruthy();
    expect(grid.classList).toContain('md:grid-cols-2');
  });

  it('should call all 3 API methods on init', () => {
    expect(movieServiceSpy.getYearsWithMultipleWinners).toHaveBeenCalledTimes(1);
    expect(movieServiceSpy.getStudiosWithWinCount).toHaveBeenCalledTimes(1);
    expect(movieServiceSpy.getMaxMinWinIntervalForProducers).toHaveBeenCalledTimes(1);
  });

  it('should populate yearsWithMultipleWinners from API response', () => {
    expect(component.yearsWithMultipleWinners).toEqual(mockYears.years);
  });

  it('should slice studios to top 3', () => {
    expect(component.topStudios.length).toBe(3);
    expect(component.topStudios[0].name).toBe('Columbia');
    expect(component.topStudios[2].name).toBe('Warner');
  });

  it('should populate max and min producer intervals', () => {
    expect(component.maxProducerIntervals).toEqual(mockIntervals.max);
    expect(component.minProducerIntervals).toEqual(mockIntervals.min);
  });

  it('should handle empty years response', () => {
    movieServiceSpy.getYearsWithMultipleWinners.and.returnValue(of({ years: [] }));
    component.ngOnInit();
    expect(component.yearsWithMultipleWinners).toEqual([]);
  });

  it('should handle empty studios response', () => {
    movieServiceSpy.getStudiosWithWinCount.and.returnValue(of({ studios: [] }));
    component.ngOnInit();
    expect(component.topStudios).toEqual([]);
  });

  it('should handle empty intervals response', () => {
    movieServiceSpy.getMaxMinWinIntervalForProducers.and.returnValue(of({ max: [], min: [] }));
    component.ngOnInit();
    expect(component.maxProducerIntervals).toEqual([]);
    expect(component.minProducerIntervals).toEqual([]);
  });
});
