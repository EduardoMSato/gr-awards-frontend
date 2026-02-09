import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { WinnersByYearComponent } from './winners-by-year.component';
import { MovieService } from '../../../../core/services/movie.service';
import { Movie, MoviePage } from '../../../../core/models/movie.model';

describe('WinnersByYearComponent', () => {
  let component: WinnersByYearComponent;
  let fixture: ComponentFixture<WinnersByYearComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  const mockMovies: Movie[] = [
    {
      id: 1,
      year: 1990,
      title: 'Test Movie',
      studios: ['Studio A'],
      producers: ['Producer A'],
      winner: true,
    },
  ];

  const mockResponse = { content: mockMovies } as MoviePage;
  const emptyResponse = { content: [] } as unknown as MoviePage;
  const mockYears = [1980, 1990, 2000, 2010];

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', ['getWinnersByYear', 'getWinnerYears']);
    movieServiceSpy.getWinnersByYear.and.returnValue(of(mockResponse));
    movieServiceSpy.getWinnerYears.and.returnValue(of(mockYears));

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, FormsModule, CardModule, TableModule, DropdownModule],
      declarations: [WinnersByYearComponent],
      providers: [{ provide: MovieService, useValue: movieServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(WinnersByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load winner years on init', () => {
    expect(movieServiceSpy.getWinnerYears).toHaveBeenCalled();
    expect(component.yearOptions.length).toBe(4);
    expect(component.yearOptions[0]).toEqual({ label: '1980', value: 1980 });
    expect(component.yearOptions[3]).toEqual({ label: '2010', value: 2010 });
  });

  it('should fetch winners when a year is selected', () => {
    component.selectedYear = 1990;
    component.onYearChange();

    expect(movieServiceSpy.getWinnersByYear).toHaveBeenCalledWith(1990);
    expect(component.winners.length).toBe(1);
    expect(component.winners[0].title).toBe('Test Movie');
  });

  it('should clear winners when year is deselected', () => {
    component.selectedYear = 1990;
    component.onYearChange();
    expect(component.winners.length).toBe(1);

    component.selectedYear = null;
    component.onYearChange();
    expect(component.winners.length).toBe(0);
    expect(movieServiceSpy.getWinnersByYear).toHaveBeenCalledTimes(1);
  });

  it('should display results after selecting a year', () => {
    component.selectedYear = 1990;
    component.onYearChange();
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);

    const cells = rows[0].querySelectorAll('td');
    expect(cells[0].textContent.trim()).toBe('1');
    expect(cells[1].textContent.trim()).toBe('1990');
    expect(cells[2].textContent.trim()).toBe('Test Movie');
  });

  it('should show empty message when no winners found', () => {
    movieServiceSpy.getWinnersByYear.and.returnValue(of(emptyResponse));
    component.selectedYear = 2099;
    component.onYearChange();
    fixture.detectChanges();

    const emptyRow = fixture.nativeElement.querySelector('tbody tr td');
    expect(emptyRow.textContent.trim()).toBe('No winners found');
  });

  it('should have correct table headers', () => {
    const headers = fixture.nativeElement.querySelectorAll('thead th');
    expect(headers[0].textContent.trim()).toBe('Id');
    expect(headers[1].textContent.trim()).toBe('Year');
    expect(headers[2].textContent.trim()).toBe('Title');
  });
});
