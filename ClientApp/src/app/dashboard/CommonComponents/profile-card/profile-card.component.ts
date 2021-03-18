import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../@core/data/users.service';
import { UserData } from '../../../@core/classes/users';

@Component({
  selector: 'ngx-profile-card',
  styleUrls: ['./profile-card.component.scss'],
  templateUrl: './profile-card.component.html',
})

export class ProfileCardComponent implements OnInit {

  user: any;
  userData: UserData;
  circPercent: number;

  getUserData() {
    this._userService.returnUserData()
      .subscribe(userData => {
        if (userData) {
          this.userData = userData;
          this.circPercent = (userData.ranking.xp - userData.ranking.baseRankXp) / ((userData.ranking.xp - userData.ranking.baseRankXp) + userData.ranking.xpTilNext) * 100;
        }
      });
  }

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.onUserChange()
      .subscribe((user: any) => this.user = user);
    this.getUserData();
  }

  returnBadge(rank) {
    return 'assets/images/badges/' + rank.replace(/ /g, '_') + '.png';
  }
}
