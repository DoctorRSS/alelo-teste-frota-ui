import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../../../../algamoney-ui/src/app/core/error-handler.service';
import { VehicleFiltro, VehicleService } from './../vehicle.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

import { Table } from 'primeng/table/table';

@Component({
  selector: 'app-vehicle-pesquisa',
  templateUrl: './vehicle-pesquisa.component.html',
  styleUrls: ['./vehicle-pesquisa.component.css']
})
export class VehiclePesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new VehicleFiltro();
  vehicles = [];

  @ViewChild('tabela', {static: true}) grid: Table;

  constructor(
    private vehicleService: VehicleService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title ){

  }

  ngOnInit() {
    this.title.setTitle('Vehicle Management');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.vehicleService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.vehicles = resultado.vehicles;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(vehicle: any) {
    this.confirmation.confirm({
      message: 'Do you want to delete this vehicle?',
      accept: () => {
        this.excluir(vehicle);
      }
    });
  }
  excluir(vehicle: any) {

    this.vehicleService.excluir(vehicle.id)
      .then(() => {
        this.grid.reset();
        this.toasty.success('Vehicle Deleted with Sucess!');
      }).catch(erro => this.errorHandler.handle(erro));
  }

}
