import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  readonly panelTitles = [
    'List years with multiple winners',
    'Top 3 studios with winners',
    'Producers with longest and shortest interval between wins',
    'List movie winners by year',
  ];

  trackByIndex(index: number): number {
    return index;
  }
}
