import { Component, input } from '@angular/core';

@Component({
  selector: 'app-seccion-busqueda',
  imports: [],
  template: `
    <div class="surface-card shadow-1 border-round surface-border border-1">
      <div class="titulo-seccion-busqueda">
        {{ titulo() }}
      </div>

      <div class="flex flex-column gap-3">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './seccion-busqueda.scss',
})
export class SeccionBusqueda {
  titulo = input.required<string>();
}
