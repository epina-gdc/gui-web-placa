import { Component, inject, input } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-seccion-titulos',
  imports: [],
  templateUrl: './seccion-titulos.html',
  styleUrl: './seccion-titulos.scss',
})
export class SeccionTitulos {
  titulo = input.required<string>();
  ruta = input<string>();
  retorno = input<boolean>(false);

  _router =  inject(Router);

  public btnRegresar(event: any): void {
    event.preventDefault();
    if (this.ruta()) {
      void this._router.navigate([this.ruta()]);
    }
  }
}
