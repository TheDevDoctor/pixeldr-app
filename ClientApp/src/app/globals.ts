import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class Globals {
    constructor(private router: Router, private location: Location) {}

  playing: boolean = false;
  building: boolean = false;
  buildType: string;

  enterPlaying() {
      this.playing = true;
      this.router.navigateByUrl('/dashboard/play');
  }

  enterBuilding(type) {
      this.building = true;
      this.buildType = type;
      this.router.navigateByUrl('/dashboard/building');
  }

  exitPlaying() {
    this.playing = false;
    // this.location.back();
  }

  exitBuilding() {
    this.building = false;
    // this.location.back();
  }
}
