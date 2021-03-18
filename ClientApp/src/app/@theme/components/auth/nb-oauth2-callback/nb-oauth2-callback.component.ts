import { Component, OnDestroy } from '@angular/core';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-oauth2-callback',
  template: `
      <h2 style="text-align: center;">Authenticating...</h2>
  `,
})
export class NbOAuth2CallbackComponent implements OnDestroy {

  alive = true;

  constructor(private authService: NbAuthService, private router: Router) {
    this.authService.authenticate('AzureADB2C')
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
        if (authResult.isSuccess() && authResult.getRedirect()) {
          this.router.navigateByUrl(authResult.getRedirect());
        } else {
          this.router.navigate(['auth', 'error']);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
