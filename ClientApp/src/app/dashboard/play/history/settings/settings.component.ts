import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/observable/timer';

const source = timer(1000, 1000);
// const subscribe = source.subscribe(val => console.log(val));

@Component({
  selector: 'ngx-history-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],

})
export class SettingsComponent implements OnInit {
  counter: number;
  subscribe = source.subscribe(val =>
    this.counter = val
  );

  flipped: boolean = false;
  dict = {'Timer': true, 'Mood': true, 'Covered': true};


  controls: Array<{}> = [
    {
      name: 'Timer',
      icon: {
        name: 'ion-ios-timer',
        size: 3.8,
      },
      type: 'danger',
    },
    {
      name: 'Mood',
      icon: {
        name: 'nb-heart',
        size: 4.5,
      },
      type: 'primary',
    },
    {
      name: 'Covered',
      icon: {
        name: 'nb-bar-chart',
        size: 4.5,
      },
      type: 'info',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  toggleView() {
    this.flipped = !this.flipped;
  }

  settingChanged($event) {
    this.dict[$event] = !this.dict[$event];
    // this.showTimer = false;
  }


}
