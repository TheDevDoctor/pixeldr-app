import { AppMonitoringModule } from './app-monitoring.module';

describe('AppMonitoringModule', () => {
  let appMonitoringModule: AppMonitoringModule;

  beforeEach(() => {
    appMonitoringModule = new AppMonitoringModule();
  });

  it('should create an instance', () => {
    expect(appMonitoringModule).toBeTruthy();
  });
});
