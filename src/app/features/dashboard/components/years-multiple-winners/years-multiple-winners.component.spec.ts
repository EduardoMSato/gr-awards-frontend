import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { YearsMultipleWinnersComponent } from './years-multiple-winners.component';
import { YearWithMultipleWinners } from '../../../../core/models/movie.model';

describe('YearsMultipleWinnersComponent', () => {
  let component: YearsMultipleWinnersComponent;
  let fixture: ComponentFixture<YearsMultipleWinnersComponent>;

  const mockData: YearWithMultipleWinners[] = [
    { year: 1986, winnerCount: 2 },
    { year: 1990, winnerCount: 3 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, CardModule, TableModule],
      declarations: [YearsMultipleWinnersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YearsMultipleWinnersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display table with data', () => {
    component.years = mockData;
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
  });

  it('should display correct year and win count', () => {
    component.years = mockData;
    fixture.detectChanges();

    const cells = fixture.nativeElement.querySelectorAll('tbody tr:first-child td');
    expect(cells[0].textContent.trim()).toBe('1986');
    expect(cells[1].textContent.trim()).toBe('2');
  });

  it('should show empty message when no data', () => {
    component.years = [];
    fixture.detectChanges();

    const emptyRow = fixture.nativeElement.querySelector('tbody tr td');
    expect(emptyRow.textContent.trim()).toBe('No data available');
  });

  it('should have table headers Year and Win Count', () => {
    fixture.detectChanges();
    const headers = fixture.nativeElement.querySelectorAll('thead th');
    expect(headers[0].textContent.trim()).toBe('Year');
    expect(headers[1].textContent.trim()).toBe('Win Count');
  });
});
