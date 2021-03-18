import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { UserService } from '../../../../@core/data/users.service';
import { UserData } from '../../../../@core/classes/users';

@Component({
  selector: 'ngx-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnDestroy, OnInit {

  playlist: Array<any> = new Array<any>();

  currentTheme: string;
  themeSubscription: any;

  user: any;
  userData: UserData;

  getUser() {
    this.userService.returnUserData()
      .subscribe(userData => {
        if (userData) {
          this.userData = userData;
          if (this.userData.playlist.length !== 0) {
            this.playlist = this.userData.playlist;
          }
        }
      });
  }

  constructor(private userService: UserService, private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnInit() {
    this.userService.onUserChange()
      .subscribe((user: any) => this.user = user);
    this.getUser();
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
