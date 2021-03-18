import { Injectable } from '@angular/core';
import { OtherUser } from '../classes/users';
import * as data from '../testing_files/top100test.json';
import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs';

const top100 = (<any>data).default;

@Injectable({
  providedIn: 'root'
})
export class LeaderboardsService {
  top100: Array<OtherUser>;
  top100Sub: BehaviorSubject<Array<OtherUser>> = new BehaviorSubject(this.top100);

  constructor(private _databaseService: DatabaseService) {
    // this.top100 = top100;

    this._databaseService.queryUserData('SELECT TOP 10 u.id, u.avatar, u.username, u.joined, u.ranking, u.builds, u.favourites FROM Users u ORDER BY u.ranking.xp DESC').subscribe(leaderboard => {
      this.top100 = leaderboard;
      this.top100Sub.next(this.top100);
    });
  }

  returnTop100() {
    return this.top100Sub.asObservable();
  }
}
