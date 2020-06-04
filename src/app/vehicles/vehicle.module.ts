import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VehiclePesquisaComponent } from './vehicle-pesquisa/vehicle-pesquisa.component';
import { VehicleCadastroComponent } from './vehicle-cadastro/vehicle-cadastro.component';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { SharedModule } from '../shared/shared.module';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    VehiclePesquisaComponent,
    VehicleCadastroComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    RadioButtonModule,
    DropdownModule,
    //CommonModule,

    SharedModule,
    VehicleRoutingModule
  ]
})
export class VehicleModule { }
