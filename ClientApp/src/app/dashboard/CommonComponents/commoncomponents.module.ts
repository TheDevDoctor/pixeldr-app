import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ProfileCardComponent } from './profile-card/profile-card.component';
import { PercentageChartComponent } from './percentage-chart/percentage-chart.component';
import { LineGraphCardComponent } from './linegraph-card/linegraph-card.component';
import { LineGraphChartComponent } from './linegraph-card/linegraph-chart.component';
import { GraphCardComponent } from './graph-card/graph-card.component';
import { GameCardComponent } from './game-card/game-card.component';
import { PlaylistComponent } from './game-card/playlist/playlist.component';
import { CurrentlyPlayingComponent } from './game-card/currently-playing/currently-playing.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { EchartsRadarComponent } from './charts/echarts-radar.component';
import { EchartsBarAnimationComponent } from './charts/echarts-bar-animation.component';
import { EchartsAreaStackComponent } from './charts/echarts-area-stack.component';
import { EchartsMultipleXaxisComponent } from './charts/echarts-multiple-xaxis.component';
import { EchartsBarComponent } from './charts/echarts-bar.component';
import { EchartsPieComponent } from './charts/echarts-pie.component';
import { EchartsLineComponent } from './charts/echarts-line.component';
import { ScenarioCardComponent } from './scenario-card/scenario-card.component';

const COMMON_COMPONENTS = [
  GameCardComponent,
  PlaylistComponent,
  CurrentlyPlayingComponent,
  GraphCardComponent,
  LineGraphCardComponent,
  LineGraphChartComponent,
  PercentageChartComponent,
  ProfileCardComponent,
  StatusCardComponent,
  EchartsLineComponent,
  EchartsPieComponent,
  EchartsBarComponent,
  EchartsMultipleXaxisComponent,
  EchartsAreaStackComponent,
  EchartsBarAnimationComponent,
  EchartsRadarComponent,
  ScenarioCardComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NgxEchartsModule,
    NgxChartsModule,
  ],
  declarations: [...COMMON_COMPONENTS],
  exports: [...COMMON_COMPONENTS],
})
export class CommonComponentsModule {}
