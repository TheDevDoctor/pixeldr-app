import { Injectable } from '@angular/core';

interface PlayerRankData {
  rank: string;
  xp: number;
  xpTilNext: number;
  baseRankXp: number;
}

@Injectable({
  providedIn: 'root'
})
export class RanksService {
  constructor() { }

  rankOrder = ['PD Foundation 1', 'PD Foundation 2', 'PD Foundation 3', 'House'];

  ranks = [
    {
      name: 'PD Foundation 1',
      xp: 100
    },
    {
      name: 'PD Foundation 2',
      xp: 500
    },
    {
      name: 'PD Foundation 3',
      xp: 1000,
    },
    {
      name: 'House',
      xp: 100000,
    }
  ];

  // function to return the players current rank. Takes two arguments: xp and current rank (i.e. the rank currently recorded in their database file).
  // Will return rank object as per interface above which should be saved to their database object.

  returnRank(xp: number, currentRank: string) {
    let rankIndex: number = this.rankOrder.indexOf(currentRank);
    let correctRank: boolean = false;

     while (rankIndex < this.rankOrder.length - 1 && !correctRank) {
      const currRankData = this.ranks[rankIndex];
      const nextRankData = this.ranks[rankIndex + 1];
      if (xp >= currRankData.xp && xp < nextRankData.xp) {
        correctRank = true;
        const rankData: PlayerRankData = {
          rank: currRankData.name,
          xp: xp,
          xpTilNext: nextRankData.xp - xp,
          baseRankXp: currRankData.xp
        };
        return rankData;
      } else if (xp >= nextRankData.xp) {
        rankIndex++;
      } else {
        rankIndex--;
      }
    }
  }
}
