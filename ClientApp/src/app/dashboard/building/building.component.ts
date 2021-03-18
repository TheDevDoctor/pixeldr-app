import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../globals';
import { Location } from '@angular/common';
import { BotModule } from '../../@core/bot/bot.module';

@Component({
  selector: 'ngx-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {
  @ViewChild('stepper') stepper;
  viewCount: number = 0;
  viewArray: Array<boolean> = [true, false, false, false];

  constructor(public globals: Globals,
    private location: Location) {
  }

  ngOnInit() {
    this.location.subscribe(x => this.stopBuilding());
  }

  // Function called when player exits playing scenario.
  stopBuilding() {
    this.globals.building = false;
    console.log('Stop playing');
  }

  nextPressed($event) {
    if (this.viewCount < 3) {
      this.stepper.next();
      console.log(this.stepper.selectedIndex);
      this.viewCount += 1;
      this.viewArray[this.viewCount] = true;
      this.viewArray[this.viewCount - 1] = false;
    } else {
      return;
    }
    // console.log(this.viewCount)
    // console.log(this.viewArray[this.viewCount - 1])
  }

  previousPressed($event) {
    if (this.viewCount > 0) {
      this.stepper.previous();
      console.log(this.stepper.selectedIndex);
      this.viewCount -= 1;
      this.viewArray[this.viewCount] = true;
      this.viewArray[this.viewCount + 1] = false;
    } else {
      return;
    }
    // console.log(this.viewCount)
    // console.log(this.viewArray[this.viewCount + 1])
  }

}
