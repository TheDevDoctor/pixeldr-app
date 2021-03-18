/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AppMonitoringService } from './@core/monitoring/app-monitoring.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  // Added App Insights page nav monitoring
  constructor(
    private appMonitoringService: AppMonitoringService,
  ) { }

  private logNavigation() {
    this.appMonitoringService.logPageView();
  }

  ngOnInit(): void {
    this.logNavigation();
  }
}
