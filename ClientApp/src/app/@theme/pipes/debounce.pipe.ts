import { Pipe, PipeTransform, ChangeDetectorRef, NgZone } from '@angular/core';

@Pipe({
  name: 'debounce',
  pure: false
})
export class DebouncePipe implements PipeTransform {

  private currentValue: any = null;
  private transformValue: any = null;
  private timeoutHandle: number = -1;

  constructor(
    public changeDetector: ChangeDetectorRef,
    private zone: NgZone,
  ) {}


  transform(value: any, debounceTime?: number): any {
    if (this.currentValue == null) {
      this.currentValue = value;
      return value;
    }
    if (this.currentValue === value) {
      // there is no value that needs debouncing at this point
      clearTimeout(this.timeoutHandle);
      return value;
    }
    if (this.transformValue !== value) {
      // there is a new value that needs to be debounced
      this.transformValue = value;
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = window.setTimeout(() => {
        this.zone.run(() => {
          this.currentValue = this.transformValue;
          this.transformValue = null;
          this.changeDetector.markForCheck();
        });
      }, typeof debounceTime === 'number' ? debounceTime : 500);
    }
    return this.currentValue;
  }

}

