import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../@core/data/database.service';
import { ScenarioPreview } from '../../../@core/classes/scenarios';

@Component({
  selector: 'ngx-current-builds',
  templateUrl: './current-builds.component.html',
  styleUrls: ['./current-builds.component.scss']
})
export class CurrentBuildsComponent implements OnInit {
  inProgress: ScenarioPreview[] = [];
  complete: ScenarioPreview[] = [];
  databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    // this.builds = databaseService.builds
    this.databaseService = databaseService;
  }


  ngOnInit() {
    /*for (const build of this.databaseService.builds) {
      if (build.published) {
        this.complete.push(build);
      } else {
        this.inProgress.push(build);
      }
    }*/
  }

  checkValueForCol(plays, name) {
    if (plays < 50) {
      return {'color': 'red'};
    } else if (plays >= 50 && plays < 200) {
      return {'color': '#00d977'};
    }
  }

}
