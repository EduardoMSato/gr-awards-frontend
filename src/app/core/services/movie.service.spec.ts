import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import {
  MoviePage,
  YearsWithMultipleWinnersResponse,
  StudiosWithWinCountResponse,
  MaxMinWinIntervalResponse,
} from '../models/movie.model';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMovies', () => {
    it('should fetch movies with page and size', () => {
      const mockResponse: MoviePage = {
        content: [{ id: 1, year: 2020, title: 'Test', studios: [], producers: [], winner: false }],
        pageable: {
          sort: { sorted: false, unsorted: true },
          pageSize: 10,
          pageNumber: 0,
          offset: 0,
          paged: true,
          unpaged: false,
        },
        totalElements: 1,
        totalPages: 1,
        last: true,
        first: true,
        number: 0,
        numberOfElements: 1,
        size: 10,
      };

      service.getMovies(0, 10).subscribe((result) => {
        expect(result.content.length).toBe(1);
        expect(result.totalElements).toBe(1);
      });

      const req = httpMock.expectOne((r) => r.url === '' && r.params.get('page') === '0');
      expect(req.request.params.get('size')).toBe('10');
      req.flush(mockResponse);
    });

    it('should include winner param when provided', () => {
      service.getMovies(0, 10, true).subscribe();

      const req = httpMock.expectOne(
        (r) => r.params.get('winner') === 'true' && r.params.get('page') === '0'
      );
      expect(req.request.params.get('size')).toBe('10');
      req.flush({ content: [] });
    });

    it('should include year param when provided', () => {
      service.getMovies(0, 10, undefined, 2020).subscribe();

      const req = httpMock.expectOne(
        (r) => r.params.get('year') === '2020' && r.params.get('page') === '0'
      );
      expect(req.request.params.has('winner')).toBeFalse();
      req.flush({ content: [] });
    });
  });

  describe('getYearsWithMultipleWinners', () => {
    it('should fetch years with multiple winners', () => {
      const mockResponse: YearsWithMultipleWinnersResponse = {
        years: [{ year: 1986, winnerCount: 2 }],
      };

      service.getYearsWithMultipleWinners().subscribe((result) => {
        expect(result.years.length).toBe(1);
        expect(result.years[0].year).toBe(1986);
      });

      const req = httpMock.expectOne('/yearsWithMultipleWinners');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getStudiosWithWinCount', () => {
    it('should fetch studios with win count', () => {
      const mockResponse: StudiosWithWinCountResponse = {
        studios: [{ name: 'Studio A', winCount: 5 }],
      };

      service.getStudiosWithWinCount().subscribe((result) => {
        expect(result.studios.length).toBe(1);
        expect(result.studios[0].name).toBe('Studio A');
      });

      const req = httpMock.expectOne('/studiosWithWinCount');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getMaxMinWinIntervalForProducers', () => {
    it('should fetch producer win intervals', () => {
      const mockResponse: MaxMinWinIntervalResponse = {
        min: [{ producer: 'Producer A', interval: 1, previousWin: 2018, followingWin: 2019 }],
        max: [{ producer: 'Producer B', interval: 20, previousWin: 1990, followingWin: 2010 }],
      };

      service.getMaxMinWinIntervalForProducers().subscribe((result) => {
        expect(result.min.length).toBe(1);
        expect(result.max.length).toBe(1);
        expect(result.max[0].interval).toBe(20);
      });

      const req = httpMock.expectOne('/maxMinWinIntervalForProducers');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getWinnersByYear', () => {
    it('should fetch winners for a specific year with page and size', () => {
      const mockResponse = {
        content: [
          {
            id: 1,
            year: 2018,
            title: 'Winner Movie',
            studios: ['Studio'],
            producers: ['Producer'],
            winner: true,
          },
        ],
      };

      service.getWinnersByYear(2018).subscribe((result) => {
        expect(result.content.length).toBe(1);
        expect(result.content[0].winner).toBeTrue();
      });

      const req = httpMock.expectOne(
        (r) =>
          r.params.get('year') === '2018' &&
          r.params.get('winner') === 'true' &&
          r.params.get('page') === '0' &&
          r.params.get('size') === '99'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
