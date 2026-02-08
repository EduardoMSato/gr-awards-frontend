import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DashboardComponent } from './dashboard.component';
import { YearsMultipleWinnersComponent } from './components/years-multiple-winners/years-multiple-winners.component';
import { TopStudiosComponent } from './components/top-studios/top-studios.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, HttpClientTestingModule, CardModule, TableModule],
      declarations: [DashboardComponent, YearsMultipleWinnersComponent, TopStudiosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the years-multiple-winners panel', () => {
    const panel = fixture.nativeElement.querySelector('app-years-multiple-winners');
    expect(panel).toBeTruthy();
  });

  it('should render the top-studios panel', () => {
    const panel = fixture.nativeElement.querySelector('app-top-studios');
    expect(panel).toBeTruthy();
  });

  it('should render 2 placeholder cards', () => {
    const cards = fixture.nativeElement.querySelectorAll(':scope > div > p-card');
    expect(cards.length).toBe(2);
  });

  it('should use a 2-column grid layout', () => {
    const grid = fixture.nativeElement.querySelector('.grid');
    expect(grid).toBeTruthy();
    expect(grid.classList).toContain('md:grid-cols-2');
  });
});
