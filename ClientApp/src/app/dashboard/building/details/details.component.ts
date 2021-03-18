import { Component, OnInit } from '@angular/core';
import { ScenarioDetails, PatientDetails, Vitals, BuildingService } from '../../../@core/data/building.service';

@Component({
  selector: 'ngx-details-component',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  specialties: Array<any>;
  difficulties: Array<String>;

  scenarioDetails: ScenarioDetails;
  patientDetails: PatientDetails;
  vitals: Vitals;

  constructor(private _detailsService: BuildingService) {
    this.specialties = _detailsService.specialties;
    this.difficulties = _detailsService.difficulties;

    this.scenarioDetails = _detailsService.scenarioDetails;
    this.patientDetails = _detailsService.patientDetails;
    this.vitals = _detailsService.vitals;
  }

  ngOnInit() {
  }

  changeSpec(specialty) {
    this.scenarioDetails.specialty = specialty.name;
  }

  changeDiff(difficulty) {
    this.scenarioDetails.difficulty = difficulty;
  }

  testPrint() {
    console.log(this.scenarioDetails.scenarioName);
  }
}
