import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ProducerWinIntervalComponent } from './producer-win-interval.component';
import { ProducerWinInterval } from '../../../../core/models/movie.model';

describe('ProducerWinIntervalComponent', () => {
  let component: ProducerWinIntervalComponent;
  let fixture: ComponentFixture<ProducerWinIntervalComponent>;

  const mockMax: ProducerWinInterval[] = [
    { producer: 'Matthew Vaughn', interval: 13, previousWin: 2002, followingWin: 2015 },
  ];

  const mockMin: ProducerWinInterval[] = [
    { producer: 'Joel Silver', interval: 1, previousWin: 1990, followingWin: 1991 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, CardModule, TableModule],
      declarations: [ProducerWinIntervalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProducerWinIntervalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render two tables', () => {
    fixture.detectChanges();
    const tables = fixture.nativeElement.querySelectorAll('p-table');
    expect(tables.length).toBe(2);
  });

  it('should display Maximum and Minimum labels', () => {
    fixture.detectChanges();
    const headings = fixture.nativeElement.querySelectorAll('h3');
    expect(headings[0].textContent.trim()).toBe('Maximum');
    expect(headings[1].textContent.trim()).toBe('Minimum');
  });

  it('should display max interval data correctly', () => {
    component.maxIntervals = mockMax;
    component.minIntervals = mockMin;
    fixture.detectChanges();

    const tables = fixture.nativeElement.querySelectorAll('p-table');
    const maxCells = tables[0].querySelectorAll('tbody tr:first-child td');
    expect(maxCells[0].textContent.trim()).toBe('Matthew Vaughn');
    expect(maxCells[1].textContent.trim()).toBe('13');
    expect(maxCells[2].textContent.trim()).toBe('2002');
    expect(maxCells[3].textContent.trim()).toBe('2015');
  });

  it('should display min interval data correctly', () => {
    component.maxIntervals = mockMax;
    component.minIntervals = mockMin;
    fixture.detectChanges();

    const tables = fixture.nativeElement.querySelectorAll('p-table');
    const minCells = tables[1].querySelectorAll('tbody tr:first-child td');
    expect(minCells[0].textContent.trim()).toBe('Joel Silver');
    expect(minCells[1].textContent.trim()).toBe('1');
    expect(minCells[2].textContent.trim()).toBe('1990');
    expect(minCells[3].textContent.trim()).toBe('1991');
  });

  it('should show empty messages when no data', () => {
    component.maxIntervals = [];
    component.minIntervals = [];
    fixture.detectChanges();

    const tables = fixture.nativeElement.querySelectorAll('p-table');
    const maxEmpty = tables[0].querySelector('tbody tr td');
    const minEmpty = tables[1].querySelector('tbody tr td');
    expect(maxEmpty.textContent.trim()).toBe('No data available');
    expect(minEmpty.textContent.trim()).toBe('No data available');
  });

  it('should have correct table headers', () => {
    fixture.detectChanges();
    const tables = fixture.nativeElement.querySelectorAll('p-table');
    const headers = tables[0].querySelectorAll('thead th');
    expect(headers[0].textContent.trim()).toBe('Producer');
    expect(headers[1].textContent.trim()).toBe('Interval');
    expect(headers[2].textContent.trim()).toBe('Previous Year');
    expect(headers[3].textContent.trim()).toBe('Following Year');
  });
});
