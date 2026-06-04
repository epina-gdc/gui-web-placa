import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, Subject, tap } from 'rxjs';
import { SesionUser } from '@core/models/sesion-user.interface';
import { UserService } from '@core/services/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private mostrarAlertaSesionInactivaSubject = new Subject<boolean>();

  mostrarAlertaSesionInactivaS: Observable<boolean> =
    this.mostrarAlertaSesionInactivaSubject.asObservable();

  private readonly usuarioSesionSubject = new BehaviorSubject<SesionUser | null>(null);
  private MOCK_TOKEN_KEY = 'PLACA_TOKEN';
  private temporizadorMock: any;

  router = inject(Router);
  usuarioService = inject(UserService);

  get usuarioSesion() {
    return this.usuarioSesionSubject.value;
  }

  existeUnaSesion$: Observable<boolean> = this.usuarioService.userData$.pipe(
    map((usuario: SesionUser | null) => !!usuario),
  );

  constructor() {
    this.recuperarSesionAlRecargarPagina();
  }

  login(login: any): Observable<any> {
    console.log('Login solicitado para:', login.username || login.email || login);
    const respuestaMock = {
      exito: true,
      respuesta: {
        token: 'mock_jwt_token_string_value',
      },
    };

    return of(respuestaMock).pipe(
      tap((respuesta) => {
        if (respuesta.exito) {
          localStorage.setItem(this.MOCK_TOKEN_KEY, respuesta.respuesta.token);
          this.settearSession(respuesta.respuesta.token);
        }
      }),
    );
  }

  recuperarSesionAlRecargarPagina() {
    const token: string | null = localStorage.getItem(this.MOCK_TOKEN_KEY);
    if (token) {
      this.settearSession(token);
    } else {
      if (this.router.url !== '/publico/crear-cuenta') {
        this.cerrarSesion();
      }
    }
  }

  settearSession(token: string) {
    this.agregarUsuarioSesion(token);
    this.usuarioService.setUser(this.obtenerUsuarioDePayload(token));
    this.iniciarTemporizadorSesion();
  }

  private agregarUsuarioSesion(accessToken: string): void {
    const usuarioSesion: SesionUser = this.obtenerUsuarioDePayload(accessToken);
    this.usuarioSesionSubject.next(usuarioSesion);
  }

  obtenerUsuarioDePayload(token: string): SesionUser {
    return {
      idPerfil: 1,
      idUsuario: 99,
      nomNombre: 'Eduardo',
      nomApellidoPaterno: 'Gomez',
      nomApellidoMaterno: 'Mock',
      cveMatricula: 'MAT-2026',
      perfil: 'Administrador',
      refCurp: 'CURP990101HDFXXXX01',
      refEmail: 'eduardo.mock@example.com',
      sub: 'eduardo.gomez',
      idSubperfil: 2,
      subperfil: 'Coordinador',
      fechaRegistro: '2026-02-15',
      refPasaporte: 'PAS-999888',
      refFolio: 'FOL-777666',
    };
  }

  cerrarSesion() {
    localStorage.removeItem(this.MOCK_TOKEN_KEY);
    this.usuarioService.clearUser();
    this.usuarioSesionSubject.next(null);
    this.detenerTemporizadorSesion();
    void this.router.navigate(['/']);
  }

  checkAuthStatus(): Observable<boolean> {
    const token: string | null = localStorage.getItem(this.MOCK_TOKEN_KEY);

    if (!token) {
      this.cerrarSesion();
      return of(false);
    }

    if (!this.usuarioSesion) {
      this.settearSession(token);
    }

    return of(true);
  }

  iniciarTemporizadorSesion(): void {
    this.detenerTemporizadorSesion();

    let contadorSegundos = 0;
    const tiempoAlerta = 60; // Lanza alerta a los 60 segundos de inactividad
    const tiempoTimeout = 120; // Cierra sesión a los 120 segundos

    this.temporizadorMock = setInterval(() => {
      contadorSegundos++;

      if (contadorSegundos === tiempoAlerta) {
        console.warn('Inactividad detectada. Emitiendo alerta.');
        this.mostrarAlertaSesionInactivaSubject.next(true);
      }

      if (contadorSegundos >= tiempoTimeout) {
        console.error('Tiempo límite de inactividad alcanzado. Forzando logout.');
        this.cerrarSesion();
      }
    }, 1000);
  }

  resetearTemporizadorSesion(): void {
    console.log('Reseteando temporizador de inactividad.');
    this.mostrarAlertaSesionInactivaSubject.next(false);
    this.iniciarTemporizadorSesion();
  }

  detenerTemporizadorSesion(): void {
    if (this.temporizadorMock) {
      clearInterval(this.temporizadorMock);
    }
  }
}
