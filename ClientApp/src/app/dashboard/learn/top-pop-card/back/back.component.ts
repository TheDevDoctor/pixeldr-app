import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'ngx-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss'],
})
export class BackComponent {

  @Input() currentScenario: {scenario: string, description: string, rating: number, played: number, difficulty: string};

  // constructor() {}

  cameras: any[] = [{
    title: 'Camera #1',
    source: 'assets/images/camera1.jpg',
  }, {
    title: 'Camera #2',
    source: 'assets/images/camera2.jpg',
  }, {
    title: 'Camera #3',
    source: 'assets/images/camera3.jpg',
  }, {
    title: 'Camera #4',
    source: 'assets/images/camera4.jpg',
  }];

  selectedCamera: any = this.cameras[0];
}
