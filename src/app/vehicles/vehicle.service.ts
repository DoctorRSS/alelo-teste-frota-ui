import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Vehicle } from '../core/model';

export class VehicleFiltro {
  plate: string;
  status: boolean;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehiclesUrl: string;

  constructor(private http: HttpClient) {
    this.vehiclesUrl = `http://localhost:8080/vehicles`;
  }

  pesquisar(filtro: VehicleFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.plate) {
      params = params.set('plate', filtro.plate.toString().replace('-', ''));
    }

    if (filtro.status) {
      params = params.set('status', filtro.status.valueOf.toString());
    }

    return this.http.get(`${this.vehiclesUrl}/filter`,
      { params })
      .toPromise()
      .then(response => {
        const vehicles = response['content']
        const resultado = {
          vehicles,
          total: response['totalElements']
        };
        return resultado;
      });

  }

  excluir(id: number): Promise<void> {

    return this.http.delete(`${this.vehiclesUrl}/${id}`)
      .toPromise().then(() => null);
  }

  adicionar(vehicle: Vehicle): Promise<Vehicle> {

    return this.http.post<Vehicle>(
      this.vehiclesUrl, vehicle)
      .toPromise();
  }

  atualizar(vehicle: Vehicle): Promise<Vehicle> {

    return this.http.put<Vehicle>(
      `${this.vehiclesUrl}/${vehicle.id}`, vehicle)
      .toPromise()
      .then(response => {
        const vehicleAlterado = response as Vehicle;

        return vehicleAlterado;
      });
  }

  buscarPorId(id: number): Promise<Vehicle> {

    return this.http.get(`${this.vehiclesUrl}/${id}`)
      .toPromise()
      .then(response => {
        const vehicle = response as Vehicle;
        return vehicle;
      });
  }
}
