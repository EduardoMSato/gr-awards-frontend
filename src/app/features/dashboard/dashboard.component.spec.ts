import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DashboardComponent } from './dashboard.component';
import { YearsMultipleWinnersComponent } from './components/years-multiple-winners/years-multiple-winners.component';
import { TopStudiosComponent } from './components/top-studios/top-studios.component';
import { ProducerWinIntervalComponent } from './components/producer-win-interval/producer-win-interval.component';
import { WinnersByYearComponent } from './components/winners-by-year/winners-by-year.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        FormsModule,
        CardModule,
        TableModule,
        InputTextModule,
        ButtonModule,
      ],
      declarations: [
        DashboardComponent,
        YearsMultipleWinnersComponent,
        TopStudiosComponent,
        ProducerWinIntervalComponent,
        WinnersByYearComponent,
      ],
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
});
