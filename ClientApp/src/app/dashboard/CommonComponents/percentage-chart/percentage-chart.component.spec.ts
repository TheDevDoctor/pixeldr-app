import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageChartComponent } from './percentage-chart.component';

describe('PercentageChartComponent', () => {
  let component: PercentageChartComponent;
  let fixture: ComponentFixture<PercentageChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentageChartComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
