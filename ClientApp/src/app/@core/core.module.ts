import { ModuleWithProviders, NgModule, Optional, SkipSelf, Injectable, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// tslint:disable-next-line:max-line-length
import { NbOAuth2AuthStrategy, NbAuthModule, NbOAuth2ResponseType, NbAuthOAuth2JWTToken, NbOAuth2AuthStrategyOptions, NbAuthStrategyClass } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of } from 'rxjs/observable/of';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AppMonitoringService } from './monitoring/app-monitoring.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NB_WINDOW } from '@nebular/theme';

const socialLinks = [
  {
    url: 'https://www.facebook.com/pixeldoctor/',
    target: '_blank',
    icon: 'socicon-facebook',
  },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return of('guest');
  }
}

// Override 'token' to 'id_token' for Azure AD B2C
(NbOAuth2ResponseType as any)['TOKEN'] = 'id_token';

// Create new token for Azure auth so it returns id_token instead of access_token
export class NbAuthAzureToken extends NbAuthOAuth2JWTToken {

  // let's rename it to exclude name clashes
  static NAME = 'nb:auth:azure:token';

  getValue(): string {
    return this.token.id_token;
  }
}


@Injectable()
export class NbAzureADB2CAuthStrategy extends NbOAuth2AuthStrategy {

  // we need this methos for strategy setup
  static setup(options: NbOAuth2AuthStrategyOptions): [NbAuthStrategyClass, NbOAuth2AuthStrategyOptions] {
    return [NbAzureADB2CAuthStrategy, options];
  }

  protected redirectResults: any = {
    [NbOAuth2ResponseType.CODE]: () => of(null),

    [NbOAuth2ResponseType.TOKEN]: () => {

      // queryParams here as token returned not as hash
      return of(this.activatedRoute.snapshot.fragment).pipe(
        map(fragment => this.parseHashAsQueryParams(fragment)),
        map((params: any) => !!(params && (params.id_token || params.error))),
      );
    },
  };

  constructor(http: HttpClient,
              private activatedRoute: ActivatedRoute,
              @Inject(NB_WINDOW) window: any) {
    super(http, activatedRoute, window);
  }
}

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    strategies: [
      NbAzureADB2CAuthStrategy.setup({
        name: 'AzureADB2C',
        clientId: '********************************',
        clientSecret: '',
        authorize: {
          endpoint: 'https://PixelDr.b2clogin.com/pixeldr.onmicrosoft.com/oauth2/v2.0/authorize',
          responseType: NbOAuth2ResponseType.TOKEN, // return id_token instead of token for Azure auth
          scope: 'https://PixelDr.onmicrosoft.com/api/profile openid profile',
          redirectUri: document.getElementsByTagName('base')[0].href + 'auth/callback',
          params: {
            'p': 'B2C_1A_signuporsignin'// Select the AADB2C policy to use
          }
        },
        token: {
          class: NbAuthAzureToken,
        },
        redirect: {
          success: '/dashboard/overview',
        },
      }),
    ],
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,
  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AppMonitoringService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
        NbAzureADB2CAuthStrategy,
      ],
    };
  }
}
