import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-build-data',
  templateUrl: './build-data.component.html',
  styleUrls: ['./build-data.component.scss']
})
export class BuildDataComponent implements OnInit {

  public isSingleView = false;


  constructor() { }

  ngOnInit() {
  }

  public selectCamera() {
    this.isSingleView = false;
  }

}
