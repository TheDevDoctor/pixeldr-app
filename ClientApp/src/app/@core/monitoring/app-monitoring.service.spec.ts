import { TestBed, inject } from '@angular/core/testing';

import { AppMonitoringService } from './app-monitoring.service';

describe('AppMonitoringService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppMonitoringService],
    });
  });

  it('should be created', inject([AppMonitoringService], (service: AppMonitoringService) => {
    expect(service).toBeTruthy();
  }));
});
