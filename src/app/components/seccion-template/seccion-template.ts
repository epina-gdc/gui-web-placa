import { Component, input } from '@angular/core';

@Component({
  selector: 'app-seccion-template',
  imports: [],
  styleUrl: './seccion-template.scss',
  template: `
    <div class="surface-card shadow-1 border-round surface-border border-1">
      <div class="titulo-seccion-template flex gap-1">
        {{ leyenda() }} :
        <p class="id-leyenda">{{ idLeyenda() }}</p>
      </div>

      <div class="flex flex-column gap-3">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class SeccionTemplate {
  leyenda = input.required<string>();
  idLeyenda = input.required<string>();
}
