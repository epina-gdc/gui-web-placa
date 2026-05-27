import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seccion-titulos',
  imports: [],
  templateUrl: './seccion-titulos.html',
  styleUrl: './seccion-titulos.scss',
})
export class SeccionTitulos {
  @Input() ruta: string = '';
  @Input() titulo: string = '';
  @Input() retorno: boolean = false;

  public btnRegresar(): void {
    if (this.ruta) {
      // void this._router.navigate([this.ruta]);
    } else {
      // this._alertServices.informacion('No se ha ingresado la ruta de retorno');
    }
  }
}
