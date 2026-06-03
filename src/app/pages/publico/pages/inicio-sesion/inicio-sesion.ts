import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { NAV_PRIVADO_URL } from '@core/utils/url-global';

@Component({
  selector: 'app-inicio-sesion',
  imports: [Card, Button, ReactiveFormsModule, InputText],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.scss',
  host: {
    class: 'flex flex-column flex-1 w-full',
  },
})
export class InicioSesion {
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
  ) {
    this.loginForm = this.inicializarForm();
  }

  loginForm!: FormGroup;

  inicializarForm(): FormGroup {
    return this.formBuilder.group({
      matricula: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  iniciarSesion(): void {
    this._router.navigate(['/privado', NAV_PRIVADO_URL.platillos]);
  }
}
