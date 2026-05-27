import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { StyleClass } from 'primeng/styleclass';

@Component({
  selector: 'app-inicio-sesion',
  imports: [Card, Button, ReactiveFormsModule, InputText, StyleClass],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.scss',
  host: {
    class: 'flex flex-column flex-1 w-full',
  },
})
export class InicioSesion {
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.inicializarForm();
  }

  loginForm!: FormGroup;

  inicializarForm(): FormGroup {
    return this.formBuilder.group({
      matricula: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  iniciarSesion(): void {}
}
