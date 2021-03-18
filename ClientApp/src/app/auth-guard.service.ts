import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: NbAuthService, private router: Router) {
    }

    canActivate() {
        return this.authService.isAuthenticated()
        .pipe(
          tap(authenticated => {
            if (!authenticated) {
              // this.router.navigate(['auth/login']);
              this.authService.authenticate('AzureADB2C')
                .subscribe((authResult: NbAuthResult) => {
              });
            }
          }),
        );
    }
}
