import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { VehicleService } from './../vehicles/vehicle.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { ErrorHandlerService } from './../core/error-handler.service';

@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    ToastModule,
    ConfirmDialogModule
  ],
  exports: [ ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    VehicleService,
    ConfirmationService,
    Title,
    MessageService
  ]
})
export class CoreModule { }
