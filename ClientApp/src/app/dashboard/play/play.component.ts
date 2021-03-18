import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  constructor(private globals: Globals,
              private location: Location) {}

  ngOnInit() {
    this.location.subscribe(x => this.stopPlaying());
  }

  // Function called when player exits playing scenario.
  stopPlaying() {
    this.globals.playing = false;
    console.log('Stop playing');
  }
}
