import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { NbStepperComponent } from '@nebular/theme';
import { DetailsComponent } from './details/details.component';
import { BuildingCanActivateGuard } from './building-can-activate-guard.service';
import { WebsocketService } from '../../@core/bot/websocket.service';
import { BotService } from '../../@core/bot/bot.service';
import { HistoryComponent } from './history/history.component';
import { AdaptationPanelComponent } from './history/adaptation-panel/adaptation-panel.component';
import { BuildingService } from '../../@core/data/building.service';
import { BuildQuestionsComponent } from './build-questions/build-questions.component';
import { CommonComponentsModule } from '../CommonComponents/commoncomponents.module';
import { DebouncePipe } from '../../@theme/pipes';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    CommonComponentsModule
  ],
  declarations: [
    DetailsComponent,
    HistoryComponent,
    AdaptationPanelComponent,
    BuildQuestionsComponent
  ],
  providers: [
    NbStepperComponent,
    BuildingCanActivateGuard,
    WebsocketService,
    BotService,
    BuildingService,
    DebouncePipe
  ],
  exports: [
    DetailsComponent,
    HistoryComponent,
    BuildQuestionsComponent
  ],
})
export class BuildingModule { }
