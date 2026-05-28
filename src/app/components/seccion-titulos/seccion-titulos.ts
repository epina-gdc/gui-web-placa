import { Component, input, Input } from '@angular/core';

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

  public btnRegresar(): void {
    if (this.ruta()) {
      // void this._router.navigate([this.ruta]);
    } else {
      // this._alertServices.informacion('No se ha ingresado la ruta de retorno');
    }
  }
}
