import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { Scenario } from '../../../@core/classes/scenarios';

@Component({
  selector: 'ngx-scenario-card',
  styleUrls: ['./scenario-card.component.scss'],
  templateUrl: './scenario-card.component.html',
})
export class ScenarioCardComponent implements OnDestroy {

  currentTheme: string;
  themeSubscription: any;

  scenarioData: Scenario;

  @Input('scenario')
  set legend(value: Scenario) {
    this.scenarioData = value;
  }

  constructor(private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
