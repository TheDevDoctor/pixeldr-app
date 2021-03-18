import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ScenarioPreview } from '../../../../@core/classes/scenarios';
import { UserService } from '../../../../@core/data/users.service';
import { UserData } from '../../../../@core/classes/users';

@Component({
  selector: 'ngx-currently-playing',
  templateUrl: './currently-playing.component.html',
  styleUrls: ['./currently-playing.component.scss'],
})
export class CurrentlyPlayingComponent implements OnInit {

  @Input()
  @HostBinding('class.collapsed')
  collapsed: boolean;

  scenario: ScenarioPreview;

  user: any;
  userData: UserData;

  getUser() {
    this.userService.returnUserData()
      .subscribe(userData => {
        if (userData) {
          this.userData = userData;
          if (this.userData.playlist.length !== 0) {
            this.scenario = this.userData.playlist[0];
          }
        }
      });
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.onUserChange()
      .subscribe((user: any) => this.user = user);
    this.getUser();
  }

}
