import { delay } from 'rxjs/operators';
import { OnChanges, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

declare const echarts: any;

@Component({
  selector: 'ngx-percentage-chart',
  styleUrls: ['./percentage-chart.component.scss'],
  template: `
    <div echarts [options]="option" class="echart">
    </div>
  `,
})
export class PercentageChartComponent implements OnDestroy, OnChanges {

  private value = 0;
  private showLabelValue = false;
  private labelFontSizeValue = 30;
  private blurColor = '#42db7d';
  private blurSize = 0;
  private color = '#42db7d';
  // private gradientLeft = '#42db7d';

  @Input('chartValue')
  set chartValue(value: number) {
    this.value = value;
    if (this.option.series) {
      this.option.series[0].data[0].value = value;
      this.option.series[0].data[1].value = 100 - value;
      this.option.series[1].data[0].value = value;
    }
  }

  @Input('color')
  set setColor(color: string) {
    this.color = color;
  }

  @Input('blurColor')
  set setBlurColor(color: string) {
    this.blurColor = color;
  }

  @Input('blurSize')
  set setBlurSize(size: number) {
    this.blurSize = size;
  }

  @Input('showLabel')
  set showLabel(value: boolean) {
    this.showLabelValue = value;
  }

  @Input('labelFontSize')
  set labelFontSize(value: number) {
    this.labelFontSizeValue = value;
  }

  option: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  // ngAfterViewInit() {
  //   if (this.option.series) {
  //     this.option.series[0].data[0].value = this.value;
  //     this.option.series[0].data[1].value = 100 - this.value;
  //     this.option.series[1].data[0].value = this.value;
  //   }
  // }

  ngOnChanges() {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const graphCardTheme: any = config.variables.graphCard;

      this.option = Object.assign({}, {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [
          {
            name: ' ',
            clockWise: true,
            hoverAnimation: false,
            type: 'pie',
            center: ['50%', '50%'],
            radius: graphCardTheme.radius,
            data: [
              {
                value: this.value,
                name: ' ',
                label: {
                  normal: {
                    position: 'center',
                    formatter: '{d}',
                    textStyle: {
                      fontSize: this.labelFontSizeValue,
                      fontFamily: config.variables.fontSecondary,
                      fontWeight: '600',
                      color: config.variables.fgHeading,
                    },
                    show: this.showLabelValue,
                  },
                },
                tooltip: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: graphCardTheme.gradientLeft,
                      },
                      {
                        offset: 1,
                        color: graphCardTheme.gradientRight,
                      },
                    ]),
                    shadowColor: this.blurColor,
                    shadowBlur: this.blurSize,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                  },
                },
                hoverAnimation: false,
              },
              {
                value: 100 - this.value,
                name: ' ',
                tooltip: {
                  show: false,
                },
                label: {
                  normal: {
                    position: 'inner',
                  },
                },
                itemStyle: {
                  normal: {
                    color: config.variables.layoutBg,
                  },
                },
              },
            ],
          },
          {
            name: ' ',
            clockWise: true,
            hoverAnimation: false,
            type: 'pie',
            center: ['50%', '50%'],
            radius: graphCardTheme.radius,
            data: [
              {
                value: this.value,
                name: ' ',
                label: {
                  normal: {
                    position: 'inner',
                    show: false,
                  },
                },
                tooltip: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: this.color,
                      },
                      {
                        offset: 1,
                        color: this.color,
                      },
                    ]),
                    shadowColor: graphCardTheme.shadowColor,
                    shadowBlur: 7,
                  },
                },
                hoverAnimation: false,
              },
              {
                value: 100 - this.value,
                name: ' ',
                tooltip: {
                  show: false,
                },
                label: {
                  normal: {
                    position: 'inner',
                  },
                },
                itemStyle: {
                  normal: {
                    color: 'none',
                  },
                },
              },
            ],
          },
        ],
      });
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
