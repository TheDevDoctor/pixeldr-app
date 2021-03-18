import { Component, OnDestroy } from '@angular/core';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import { NbAuthAzureToken } from '../../../../@core/core.module';

@Component({
  selector: 'ngx-oauth2-login',
  template: `
          <button class="btn btn-success" *ngIf="!token" (click)="login()">Sign In</button>
          <button class="btn btn-warning" *ngIf="token" (click)="logout()">Sign Out</button>
  `,
})
export class NbOAuth2LoginComponent implements OnDestroy {

  alive = true;
  token: NbAuthAzureToken;

  constructor(private authService: NbAuthService) {
    this.authService.onTokenChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe((token: NbAuthAzureToken) => {
        this.token = null;
        if (token && token.isValid()) {
          this.token = token;
        }
      });
  }

  login() {
    this.authService.authenticate('AzureADB2C')
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  logout() {
    this.authService.logout('AzureADB2C')
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
