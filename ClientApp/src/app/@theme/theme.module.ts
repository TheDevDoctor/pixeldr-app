import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';



import {
  NbActionsModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSidebarModule,
  NbTabsetModule,
  NbThemeModule,
  NbUserModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  NbProgressBarModule,
  NbChatModule,
  NbListModule,
  NbStepperModule,
  NbInputModule,
  NbButtonModule,
  NbSpinnerModule,
  NbAccordionModule
} from '@nebular/theme';

import { NbSecurityModule } from '@nebular/security';

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  FeedComponent
} from './components';

import { CapitalizePipe, PluralPipe, RoundPipe, TimingPipe } from './pipes';
import {
  DashboardLayoutComponent,
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { NbOAuth2LoginComponent } from './components/auth/nb-oauth2-login/nb-oauth2-login.component';
import { NbOAuth2CallbackComponent } from './components/auth/nb-oauth2-callback/nb-oauth2-callback.component';
import { AuthErrorComponent } from './components/auth/auth-error/auth-error.component';
import { DebouncePipe } from './pipes/debounce.pipe';


const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  NgbModule,
  NbSecurityModule,
  NbListModule,
  NbProgressBarModule,
  NbStepperModule,
  NbChatModule,
  NbButtonModule,
  NbInputModule,
  NbSpinnerModule,
  NbAccordionModule// *nbIsGranted directive
];

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  DashboardLayoutComponent,
  FeedComponent,
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  DebouncePipe
];

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'cosmic',
    },
    [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME ],
  ).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
];

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES, RouterModule],
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES, AuthErrorComponent],
  declarations: [...COMPONENTS, ...PIPES, NbOAuth2LoginComponent, NbOAuth2CallbackComponent, AuthErrorComponent],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [...NB_THEME_PROVIDERS],
    };
  }
}
