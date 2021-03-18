import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AppMonitoringService } from '../../../@core/monitoring/app-monitoring.service';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Globals } from '../../../globals';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  userPicture = 'assets/images/defaultThumbnail.png';

  userMenu = [
    { title: 'Profile' },
    { title: 'Log out' }
  ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private appMonitoringService: AppMonitoringService,
              private authService: NbAuthService,
              private router: Router,
              public globals: Globals) { }

  ngOnInit() {
    this.userService.onUserChange()
      .subscribe((user: any) => this.user = user);
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'userMenu'),
        map(({ item: { title } }) => title)
      )
      .subscribe(title => this.menuSelection(title));
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.appMonitoringService.logEvent('startSearch');
  }

  menuSelection(choice) {
    switch (choice) {
      case 'Log out':
        this.authService.logout('AzureADB2C')
          .subscribe((authResult: NbAuthResult) => {
            if (authResult.isSuccess()) {
              // tslint:disable-next-line:max-line-length
              window.location.href = 'https://pixeldr.b2clogin.com/pixeldr.onmicrosoft.com/oauth2/v2.0/logout?p=B2C_1A_signuporsignin&post_logout_redirect_uri=https%3A%2F%2Flocalhost:5001%2F';
            }
          });
        break;
      default: break;
    }
  }

  exitPlayOrBuild() {
    if (this.globals.playing) {
      this.globals.exitPlaying();
    } else {
      this.globals.exitBuilding();
    }
  }
}
