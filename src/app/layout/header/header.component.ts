import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  navItems = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Movies', route: '/movies' },
  ];

  trackByRoute(_index: number, item: { route: string }): string {
    return item.route;
  }
}
