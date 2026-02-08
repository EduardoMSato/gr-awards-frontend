import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { YearsMultipleWinnersComponent } from './components/years-multiple-winners/years-multiple-winners.component';
import { TopStudiosComponent } from './components/top-studios/top-studios.component';

@NgModule({
  declarations: [DashboardComponent, YearsMultipleWinnersComponent, TopStudiosComponent],
  imports: [SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
