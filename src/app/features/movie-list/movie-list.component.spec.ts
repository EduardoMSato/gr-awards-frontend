import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../core/services/movie.service';
import { MoviePage } from '../../core/models/movie.model';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  const mockResponse: MoviePage = {
    content: [
      {
        id: 1,
        year: 1990,
        title: 'Test Movie',
        studios: ['Studio A'],
        producers: ['Producer A'],
        winner: true,
      },
      {
        id: 2,
        year: 1991,
        title: 'Another Movie',
        studios: ['Studio B'],
        producers: ['Producer B'],
        winner: false,
      },
    ],
    pageable: {
      sort: { sorted: false, unsorted: true },
      pageSize: 15,
      pageNumber: 0,
      offset: 0,
      paged: true,
      unpaged: false,
    },
    totalElements: 200,
    totalPages: 14,
    last: false,
    first: true,
    number: 0,
    numberOfElements: 2,
    size: 15,
  };

  const emptyResponse: MoviePage = {
    ...mockResponse,
    content: [],
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
  };

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovies']);
    movieServiceSpy.getMovies.and.returnValue(of(mockResponse));

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        TableModule,
        InputTextModule,
        DropdownModule,
        ButtonModule,
      ],
      declarations: [MovieListComponent],
      providers: [{ provide: MovieService, useValue: movieServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on init', () => {
    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith(0, 15, undefined, undefined);
  });

  it('should display movies in the table', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
  });

  it('should display correct movie data', () => {
    const cells = fixture.nativeElement.querySelectorAll('tbody tr:first-child td');
    expect(cells[0].textContent.trim()).toBe('1');
    expect(cells[1].textContent.trim()).toBe('1990');
    expect(cells[2].textContent.trim()).toBe('Test Movie');
    expect(cells[3].textContent.trim()).toBe('Studio A');
    expect(cells[4].textContent.trim()).toBe('Producer A');
    expect(cells[5].textContent.trim()).toBe('Yes');
  });

  it('should display "No" for non-winner movies', () => {
    const cells = fixture.nativeElement.querySelectorAll('tbody tr:nth-child(2) td');
    expect(cells[5].textContent.trim()).toBe('No');
  });

  it('should apply year filter', () => {
    movieServiceSpy.getMovies.calls.reset();
    component.filterYear = 1990;
    component.applyFilters();

    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith(0, 15, undefined, 1990);
  });

  it('should apply winner filter', () => {
    movieServiceSpy.getMovies.calls.reset();
    component.filterWinner = true;
    component.applyFilters();

    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith(0, 15, true, undefined);
  });

  it('should apply both filters together', () => {
    movieServiceSpy.getMovies.calls.reset();
    component.filterYear = 2000;
    component.filterWinner = false;
    component.applyFilters();

    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith(0, 15, false, 2000);
  });

  it('should show empty message when no movies found', () => {
    movieServiceSpy.getMovies.and.returnValue(of(emptyResponse));
    component.applyFilters();
    fixture.detectChanges();

    const emptyRow = fixture.nativeElement.querySelector('tbody tr td');
    expect(emptyRow.textContent.trim()).toBe('No movies found');
  });

  it('should have correct table headers', () => {
    const headers = fixture.nativeElement.querySelectorAll('thead th');
    expect(headers[0].textContent.trim()).toBe('Id');
    expect(headers[1].textContent.trim()).toBe('Year');
    expect(headers[2].textContent.trim()).toBe('Title');
    expect(headers[3].textContent.trim()).toBe('Studios');
    expect(headers[4].textContent.trim()).toBe('Producers');
    expect(headers[5].textContent.trim()).toBe('Winner');
  });

  it('should have winner dropdown with 3 options', () => {
    expect(component.winnerOptions.length).toBe(3);
    expect(component.winnerOptions[0].label).toBe('Yes/No');
    expect(component.winnerOptions[1].label).toBe('Yes');
    expect(component.winnerOptions[2].label).toBe('No');
  });

  it('should handle pagination by calling loadMovies with correct page', () => {
    movieServiceSpy.getMovies.calls.reset();
    component.loadMovies({ first: 15, rows: 15 });

    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith(1, 15, undefined, undefined);
  });
});
