import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Motivo } from '@core/models/motivo.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputText } from 'primeng/inputtext';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-modal-modificar-minutas',
  imports: [Button, ReactiveFormsModule, InputText],
  templateUrl: './modal-modificar-minutas.html',
  styleUrl: './modal-modificar-minutas.scss',
})
export class ModalModificarMinutas {
  protected _alertaService: AlertService = inject(AlertService);

  motivos: Motivo[] = [
    { idMotivo: 1, descripcion: 'Ingredientes Incorrectos' },
    { idMotivo: 2, descripcion: 'Falta de Ingredientes' },
    { idMotivo: 3, descripcion: 'Otros' },
  ];

  filtroForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) {
    this.filtroForm = this.fb.group({
      motivo: [null, Validators.required],
    });
  }

  get mensaje(): string {
    return this.config.data?.mensaje ?? '';
  }

  get textoBoton(): string {
    return this.config.data?.textoBoton ?? 'Aceptar';
  }

  aceptar(): void {
    this.ref.close(true);
    this.guardar();
  }

  cancelar(): void {
    this.ref.close(false);
  }

  guardar(): void {
    this._alertaService.exito('Raciones modificadas', '');
  }
}
