import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VehicleCadastroComponent } from './vehicle-cadastro/vehicle-cadastro.component';
import { VehiclePesquisaComponent } from './vehicle-pesquisa/vehicle-pesquisa.component';

const routes: Routes = [
  {
  path: '',
  component: VehiclePesquisaComponent
},
  {
    path: 'novo',
    component: VehicleCadastroComponent
  },
  {
    path: ':codigo',
    component: VehicleCadastroComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class VehicleRoutingModule { }
