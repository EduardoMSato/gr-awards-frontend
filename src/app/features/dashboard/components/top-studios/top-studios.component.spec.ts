import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TopStudiosComponent } from './top-studios.component';
import { StudioWinCount } from '../../../../core/models/movie.model';

describe('TopStudiosComponent', () => {
  let component: TopStudiosComponent;
  let fixture: ComponentFixture<TopStudiosComponent>;

  const mockData: StudioWinCount[] = [
    { name: 'Columbia Pictures', winCount: 7 },
    { name: 'Paramount Pictures', winCount: 6 },
    { name: 'Warner Bros.', winCount: 5 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, CardModule, TableModule],
      declarations: [TopStudiosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopStudiosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display table with top 3 studios', () => {
    component.studios = mockData;
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
  });

  it('should display correct studio name and win count', () => {
    component.studios = mockData;
    fixture.detectChanges();

    const cells = fixture.nativeElement.querySelectorAll('tbody tr:first-child td');
    expect(cells[0].textContent.trim()).toBe('Columbia Pictures');
    expect(cells[1].textContent.trim()).toBe('7');
  });

  it('should show empty message when no data', () => {
    component.studios = [];
    fixture.detectChanges();

    const emptyRow = fixture.nativeElement.querySelector('tbody tr td');
    expect(emptyRow.textContent.trim()).toBe('No data available');
  });

  it('should have table headers Name and Win Count', () => {
    fixture.detectChanges();
    const headers = fixture.nativeElement.querySelectorAll('thead th');
    expect(headers[0].textContent.trim()).toBe('Name');
    expect(headers[1].textContent.trim()).toBe('Win Count');
  });
});
