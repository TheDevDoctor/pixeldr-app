import { AfterViewInit, Component, Input, OnDestroy, AfterViewChecked, OnChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-radar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsRadarComponent implements OnDestroy, OnChanges {
  options: any = {};
  themeSubscription: any;

  private legendValues = [];
  private maxValue = 100;
  private dataDictionary = {};

  @Input('legend')
  set legend(value: Array<string>) {
    this.legendValues = value;
  }
  @Input('max')
  set max(value: number) {
    this.maxValue = value;
  }
  @Input('data')
  set data(value: Object) {
    this.dataDictionary = value;
  }

  constructor(private theme: NbThemeService) {
  }

 ngOnChanges() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      const indicatorObjectArray = [];
      const dataArray = [];

      // Loop through the dataDictionary to map keys to indicator titles & values to data array
      Object.keys(this.dataDictionary).forEach(key => {
        const indicatorObject = { name: key, max: this.maxValue };
        indicatorObjectArray.push(indicatorObject);
        dataArray.push(this.dataDictionary[key]);
      });

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.danger, colors.danger],
        tooltip: {},
        legend: {
          data: this.legendValues,
          textStyle: {
            color: echarts.textColor,
          },
        },
        radar: {
          name: {
            textStyle: {
              color: echarts.textColor,
            },
          },
          indicator: indicatorObjectArray,
          splitArea: {
            areaStyle: {
              color: 'transparent',
            },
          },
        },
        series: [
          {
            name: '',
            type: 'radar',
            data: [
              {
                value: dataArray,
                name: this.legendValues[0],
              },
            ],
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
