import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { YearsMultipleWinnersComponent } from './components/years-multiple-winners/years-multiple-winners.component';

@NgModule({
  declarations: [DashboardComponent, YearsMultipleWinnersComponent],
  imports: [SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
