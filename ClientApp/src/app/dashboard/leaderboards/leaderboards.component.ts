import { Component, OnInit } from '@angular/core';
import { LeaderboardsService } from '../../@core/data/leaderboards.service';
import { OtherUser } from '../../@core/classes/users';

@Component({
  selector: 'ngx-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent implements OnInit {
  top100: Array<OtherUser>;
  highestXP: number;
  selectedPlayer: OtherUser;
  circPercent: number = 80;

  loading = true;
  flipped = false;

  urls = ['assets/images/badges/pd_foundation_1.png', 'assets/images/badges/pd_foundation_1_op2.png'];
  constructor(private _leaderboardsService: LeaderboardsService) {
    // this.top100 = leaderboardsService.top100;
    // this.highestXP = this.top100[0].ranking.xp;
  }

  ngOnInit() {
    this._leaderboardsService.returnTop100().subscribe(top100 => {
      this.top100 = top100;
      if (top100 !== undefined) {
        this.highestXP = this.top100[0].ranking.xp;
        this.loading = false;
      }
    });
  }

  returnBadge(rank) {
    const dict = {
      'PD Foundation 1': 'assets/images/badges/PD_Foundation_1.png',
      'PD Foundation 2': 'assets/images/badges/PD_Foundation_2.png',
      'PD Foundation 3': 'assets/images/badges/PD_Foundation_3.png',
    };
    return dict[rank];
  }

  playerSelected(user) {
    this.setSelectedPlayer(user);
    this.toggleView();
    console.log(user.id);
    console.log(this.circPercent);
  }

  setSelectedPlayer(player) {
    this.selectedPlayer = player;
    this.circPercent = (player.ranking.xp - player.ranking.baseRankXp) / ((player.ranking.xp - player.ranking.baseRankXp) + player.ranking.xpTilNext) * 100;
  }

  toggleView() {
    this.flipped = !this.flipped;
  }

}
