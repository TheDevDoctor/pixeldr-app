import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';

import { NgxEchartsModule } from 'ngx-echarts';

import { LearnComponent } from './learn.component';
import { TopPopCardComponent } from './top-pop-card/top-pop-card.component';
import { FrontComponent } from './top-pop-card/front/front.component';
import { BackComponent } from './top-pop-card/back/back.component';
import { TopPopHeaderComponent } from './top-pop-card/top-pop-header/top-pop-header.component';
import { ScenarioSearchComponent } from './scenario-search/scenario-search.component';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    ToasterModule.forRoot(),
  ],
  declarations: [
    LearnComponent,
    TopPopCardComponent,
    FrontComponent,
    BackComponent,
    TopPopHeaderComponent,
    ScenarioSearchComponent
  ],
  exports: [
    LearnComponent,
    TopPopCardComponent,
    FrontComponent,
    BackComponent,
    TopPopHeaderComponent,
    ScenarioSearchComponent
  ]
})
export class LearnModule { }
