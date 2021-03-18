import { NbOAuth2CallbackComponent } from './@theme/components/auth/nb-oauth2-callback/nb-oauth2-callback.component';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuard } from './auth-guard.service';
import { AuthErrorComponent } from './@theme/components/auth/auth-error/auth-error.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard], // check if user is signed in before granting access
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'callback',
        component: NbOAuth2CallbackComponent
      },
      {
        path: 'error',
        component: AuthErrorComponent
      }
      /*
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
      */
    ],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
