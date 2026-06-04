import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SesionUser } from '@core/models/sesion-user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usuarioSesion!: SesionUser;

  constructor() {}

  private readonly userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  setUser(data: SesionUser) {
    this.userDataSubject.next(data);
  }

  clearUser() {
    this.userDataSubject.next(null);
  }
}
