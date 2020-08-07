import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { Vehicle } from './../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { VehicleService } from './../vehicle.service';


@Component({
  selector: 'app-vehicle-cadastro',
  templateUrl: './vehicle-cadastro.component.html',
  styleUrls: ['./vehicle-cadastro.component.css']
})
export class VehicleCadastroComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private vehicleService: VehicleService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    this.title.setTitle('New Vehicle');

    const idVehicle = this.route.snapshot.params['id'];

    if (idVehicle) {
      this.carregarVehicle(idVehicle);
    }
  }

  carregarVehicle(id: number) {
    return this.vehicleService.buscarPorId(id)
    .then(vehicle => {
      this.formulario.patchValue(vehicle);
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      plate: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(8)]],
      model: [null, Validators.required ],
      manufacturer: [null, Validators.required ],
      color: [null, Validators.required ],
      status: [true, Validators.required]
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!(input.value) || input.value.length >= valor ) ? null : { tamanhoMinimo:  {tamanho: valor} };
    };
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  salvar() {
    if (this.editando) {
      this.atualizarVehicle();
    } else {
      this.adicionarVehicle();
    }
  }

  adicionarVehicle() {
    this.vehicleService.adicionar(this.formulario.value)
    .then(vehicleAdicionado => {
      this.messageService.add({ severity: 'success', detail: 'Vehicle Created with Sucess!' });

      this.router.navigate(['/vehicles', vehicleAdicionado.id]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarVehicle() {
    this.vehicleService.atualizar(this.formulario.value)
    .then(vehicle => {
      this.formulario.patchValue(vehicle);

      this.messageService.add({ severity: 'success', detail: 'Vehicle Updated with Sucess!' });
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.formulario.reset();
    setTimeout(function() {
      this.vehicle = new Vehicle();
    }.bind(this), 1);
    this.router.navigate(['/vehicles/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Update Vehicle: ${this.formulario.get('plate').value}`);
  }
}
