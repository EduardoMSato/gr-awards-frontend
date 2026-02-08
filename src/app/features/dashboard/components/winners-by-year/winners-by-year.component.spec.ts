import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
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

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', ['getWinnersByYear']);
    movieServiceSpy.getWinnersByYear.and.returnValue(of(mockResponse));

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        CardModule,
        TableModule,
        InputTextModule,
        ButtonModule,
      ],
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

  it('should have search button disabled when no year entered', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });

  it('should enable search button when year is entered', () => {
    component.searchYear = 1990;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeFalse();
  });

  it('should call MovieService when search is triggered', () => {
    component.searchYear = 1990;
    component.searchWinners();

    expect(movieServiceSpy.getWinnersByYear).toHaveBeenCalledWith(1990);
  });

  it('should not call MovieService when year is null', () => {
    component.searchYear = null;
    component.searchWinners();

    expect(movieServiceSpy.getWinnersByYear).not.toHaveBeenCalled();
  });

  it('should display results after search', () => {
    component.searchYear = 1990;
    component.searchWinners();
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
    component.searchYear = 2099;
    component.searchWinners();
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
