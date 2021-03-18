import { Component } from '@angular/core';
import { NbAuthResult, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-auth-error',
  styleUrls: ['./auth-error.component.scss'],
  templateUrl: './auth-error.component.html',
})
export class AuthErrorComponent {

  constructor(private authService: NbAuthService) {
  }

  logIn() {
    this.authService.authenticate('AzureADB2C')
      .subscribe((authResult: NbAuthResult) => {
      });
  }
}
