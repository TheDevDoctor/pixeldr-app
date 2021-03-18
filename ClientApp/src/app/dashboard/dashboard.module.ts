import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { LearnModule } from './learn/learn.module';
import { PlayModule } from './play/play.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { CommonComponentsModule } from './CommonComponents/commoncomponents.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { PerformanceComponent } from './performance/performance.component';
// import { TablesComponent } from './tables/tables.component';
import { BuildComponent } from './buildPage/buildPage.component';
// import { CurrentBuildsComponent } from './build/current-builds/current-builds.component';
import { BuildModule } from './buildPage/buildPage.module';
import { BuildingComponent } from './building/building.component';
import { PlayComponent } from './play/play.component';
import { BuildingModule } from './building/building.module';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { DiscussionBoardsComponent } from './discussion-boards/discussion-boards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const DASHBOARD_COMPONENTS = [
  DashboardComponent,
  OverviewComponent,
  PerformanceComponent,
  BuildComponent,
  BuildingComponent,
  LeaderboardsComponent,
  PlayComponent,
  DiscussionBoardsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
    DashboardRoutingModule,
    ThemeModule,
    CommonComponentsModule,
    MiscellaneousModule,
    LearnModule,
    PlayModule,
    BuildModule,
    BuildingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...DASHBOARD_COMPONENTS,
  ],
})
export class DashboardModule {
  playing = false;
}
