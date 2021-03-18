import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { CurrentBuildsComponent } from './current-builds/current-builds.component';
import { BuildDataComponent } from './build-data/build-data.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule
  ],
  exports: [
    CurrentBuildsComponent,
    BuildDataComponent
  ],
  declarations: [
    CurrentBuildsComponent,
    BuildDataComponent
  ]
})
export class BuildModule {

 }
