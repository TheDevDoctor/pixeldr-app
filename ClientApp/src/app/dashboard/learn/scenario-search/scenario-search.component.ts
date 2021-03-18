import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-scenario-search',
  templateUrl: './scenario-search.component.html',
  styleUrls: ['./scenario-search.component.scss'],
})
export class ScenarioSearchComponent implements OnInit {

  modules: Array<string> = ['Circulation and Breathing', 'Endocrinology', 'Child and Women\'s health'];
  specialties: Array<string> = ['Cardiology', 'Respiratory', 'Gastroenterology'];
  difficulties: Array<string> = ['Easy', 'Mediocre', 'Hard', 'House'];
  ratings: Array<string> = ['1', '2', '3', '4', '5'];

  currentSpecialty: string = 'Specialty';
  currentModule: string = 'Module';
  currentDifficulty: string = 'Difficulties';
  currentRating: string = 'Rating';

  constructor() { }

  ngOnInit() {
  }

}
