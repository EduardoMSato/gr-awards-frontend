import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ApiInterceptor } from './api.interceptor';
import { environment } from '../../../environments/environment';

describe('ApiInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should prepend the API base URL to requests', () => {
    httpClient.get('/yearsWithMultipleWinners').subscribe();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/yearsWithMultipleWinners`);
    expect(req.request.url).toBe(`${environment.apiBaseUrl}/yearsWithMultipleWinners`);
    req.flush({});
  });

  it('should prepend the API base URL to root path requests', () => {
    httpClient.get('').subscribe();

    const req = httpMock.expectOne(environment.apiBaseUrl);
    expect(req.request.url).toBe(environment.apiBaseUrl);
    req.flush({});
  });
});
