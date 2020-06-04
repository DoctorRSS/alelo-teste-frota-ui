import { ErrorHandlerService } from './../core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleService } from './../vehicles/vehicle.service';
import { ToastyModule } from 'ng2-toasty';

import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,

    ConfirmDialogModule,
    ToastyModule.forRoot(),
  ],
  exports: [ ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    VehicleService,
    ConfirmationService,
    Title
  ]
})
export class CoreModule { }
