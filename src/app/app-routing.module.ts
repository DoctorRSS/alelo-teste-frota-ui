import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  { path: 'vehicles', loadChildren: () => import('./vehicles/vehicle.module').then(m => m.VehicleModule)},

  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: '**', redirectTo: 'vehicles'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
