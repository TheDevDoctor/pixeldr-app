import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';

import { UserService } from '../../../../@core/data/users.service';

@Component({
  selector: 'ngx-front',
  styleUrls: ['./front.component.scss'],
  templateUrl: './front.component.html',
})
export class FrontComponent  {

  @Input() scenarios: Array<{}>;

  @Output() selectedEvent = new EventEmitter<any>();

  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;

  constructor(/*private userService: UserService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService*/) {

    // this.breakpoints = this.breakpointService.getBreakpointsMap();
    // this.themeSubscription = this.themeService.onMediaQueryChange()
    //   .subscribe(([oldValue, newValue]) => {
    //     this.breakpoint = newValue;
    //   });
  }

  optionSelected(listEvent: HTMLElementEventMap) {
    // console.log('Clicked');
    this.selectedEvent.emit(listEvent);
  }

  // ngOnInit() {
  // }
}
