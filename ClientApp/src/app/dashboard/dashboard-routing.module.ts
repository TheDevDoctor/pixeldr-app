import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PlayCanActivateGuard } from './play/play-can-activate-guard.service';
import { BuildingCanActivateGuard } from './building/building-can-activate-guard.service';

import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { PerformanceComponent } from './performance/performance.component';
// import { TablesComponent } from './tables/tables.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { LearnComponent } from './learn/learn.component';
import { PlayComponent } from './play/play.component';
import { BuildComponent } from './buildPage/buildPage.component';
import { BuildingComponent } from './building/building.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { DiscussionBoardsComponent } from './discussion-boards/discussion-boards.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [{
    path: 'overview',
    component: OverviewComponent,
  }, {
    path: 'performance',
    component: PerformanceComponent,
  }, {
    path: 'learn',
    component: LearnComponent,
  }, {
    path: 'build',
    component: BuildComponent,
  }, {
    path: 'building',
    component: BuildingComponent,
    canActivate: [BuildingCanActivateGuard]
  },  {
    path: 'discussion-boards',
    component: DiscussionBoardsComponent,
  }, {
    path: 'leaderboards',
    component: LeaderboardsComponent,
  }, {
    path: 'profile',
    component: NotFoundComponent,
  }, {
    path: 'settings',
    component: NotFoundComponent,
  },
  {
    path: 'play',
    component: PlayComponent,
    canActivate: [PlayCanActivateGuard]
  },
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
