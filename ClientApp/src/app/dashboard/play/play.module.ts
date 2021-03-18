import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardModule } from '../dashboard.module';

import { PlayComponent } from './play.component';
import { WebsocketService } from '../../@core/bot/websocket.service';
import { BotService } from '../../@core/bot/bot.service';
import { PlayCanActivateGuard } from './play-can-activate-guard.service';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './history/settings/settings.component';
import { TemperatureComponent } from './history/settings/temperature/temperature.component';
import { TemperatureDraggerComponent } from './history/settings/temperature/temperature-dragger/temperature-dragger.component';
import { D3BarComponent } from './history/settings/d3-bar/d3-bar.component';
import { CommonComponentsModule } from '../CommonComponents/commoncomponents.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NgxChartsModule,
    CommonComponentsModule,
  ],
  declarations: [
    HistoryComponent,
    SettingsComponent,
    TemperatureComponent,
    TemperatureDraggerComponent,
    D3BarComponent,
  ],
  exports: [
    HistoryComponent,
    SettingsComponent,
    TemperatureComponent,
    TemperatureDraggerComponent,
    D3BarComponent,
  ],
  providers: [WebsocketService, BotService, PlayCanActivateGuard]
})
export class PlayModule {

 }
