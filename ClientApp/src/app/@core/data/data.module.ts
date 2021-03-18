import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { SmartTableService } from './smart-table.service';
import { DatabaseService } from './database.service';
import { StateService } from './state.service';
import { BuildingService } from './building.service';
import { RanksService } from './ranks-service.service';

const SERVICES = [
  UserService,
  SmartTableService,
  DatabaseService,
  StateService,
  BuildingService,
  RanksService,
];

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
