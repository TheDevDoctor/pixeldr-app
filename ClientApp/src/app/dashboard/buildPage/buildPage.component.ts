import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';


@Component({
  selector: 'ngx-build',
  templateUrl: './buildPage.component.html',
  styleUrls: ['./buildPage.component.scss']
})
export class BuildComponent implements OnInit {

  constructor(private globals: Globals) {

  }

  ngOnInit() {
  }

  enterBuilding(type) {
    this.globals.enterBuilding(type);
  }
}
