import { Component, OnInit, OnDestroy } from '@angular/core';
import { PerformanceData, UserData } from '../../@core/classes/users';
import { ScenarioPreview } from '../../@core/classes/scenarios';
import { UserService } from '../../@core/data/users.service';

@Component({
  selector: 'ngx-performance',
  styleUrls: ['./performance.component.scss'],
  templateUrl: './performance.component.html',
})
export class PerformanceComponent implements OnInit, OnDestroy {

  performance: PerformanceData;
  user: any;
  userData: UserData;

  recentlyPlayedScenarioTitles: Array<string>;
  recentlyPlayedScenarios: Array<ScenarioPreview>;

  getUser() {
    this.userService.returnUserData()
      .subscribe(userData => {
        if (userData) {
          this.userData = userData;
          this.performance = this.userData.performance;
          this.recentlyPlayedScenarios = this.userData.performance.previouslyPlayed;
        }
        for (let s = 0; s < 5; s++) {
          // GetScenario document, then add it to the array
          // this.recentlyPlayedScenarios.push(scenario);
        }
      });
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.onUserChange()
      .subscribe((user: any) => this.user = user);
    this.getUser();
  }

  ngOnDestroy() { }

  // Subjects Radar chart
  moduleSelectionDropdown = [{
    title: 'Module 1',
    key: 'm1',
  }, {
    title: 'Module 2',
    key: 'm2',
  }];
  selectedModule = this.moduleSelectionDropdown[0];
  // Skills Over Time line chart
  yearSelectionDropdown = [{
    title: '2018',
    key: '2018',
  }, {
    title: '2017',
    key: '2017',
  }];
  selectedYear = this.yearSelectionDropdown[0];

}
