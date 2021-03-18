import { Component } from '@angular/core';

import { MENU_ITEMS } from './dashboard-menu';

@Component({
  selector: 'ngx-dashboard',
  template: `
    <ngx-dashboard-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-dashboard-layout>
  `
})
export class DashboardComponent {
  menu = MENU_ITEMS;
}
