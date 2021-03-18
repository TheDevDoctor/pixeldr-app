import { Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="onPressed()" [ngClass]="{'off': !on}">
      <div class="icon-container" [ngClass]="{'mini': mini}">
        <div class="icon {{ type }}" [ngClass]="{'icon-mini': mini}">
          <ng-content></ng-content>
        </div>
      </div>

      <div *ngIf="!mini" class="details">
        <div class="title">{{ title }}</div>
        <div class="status">{{ on ? 'ON' : 'OFF' }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() on = true;
  @Input() mini = false;

  @Output() cardPressed = new EventEmitter();

  onPressed() {
    this.on = !this.on;
    this.cardPressed.emit(this.title);
  }
}
