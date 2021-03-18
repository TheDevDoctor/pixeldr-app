import { Component, OnDestroy, AfterViewInit, OnChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { BotService } from '../../../../../@core/bot/bot.service';
import { Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs'; // Angular 6

@Component({
  selector: 'ngx-d3-bar',
  template: `
    <ngx-charts-bar-vertical
      [scheme]="colorScheme"
      [results]="sections"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel">
    </ngx-charts-bar-vertical>
  `,
})
export class D3BarComponent implements OnDestroy, AfterViewInit, OnChanges {

  sections: Array<{name: string, value: number}>;
  showLegend = false;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'Country';
  yAxisLabel = 'Population';
  colorScheme: any;
  themeSubscription: any;



  constructor(private theme: NbThemeService, public botService: BotService) {
    this.botService.getSections().subscribe(sections => {
      this.sections = [...sections];
    });
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  ngAfterViewInit(): void {}

  ngOnChanges() {}

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
