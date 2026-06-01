import { Component, ElementRef, HostListener, input, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { NAV_BASE_URL, NAV_PRIVADO_URL } from '@core/utils/url-global';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-interno',
  imports: [Menu, Ripple, RouterLink],
  templateUrl: './menu-interno.html',
  styleUrl: './menu-interno.scss',
})
export class MenuInterno {
  visible = input<boolean>(false);

  onClose = output<void>();

  items: MenuItem[] = [
    {
      items: [
        {
          label: 'Cerrar menú',
          icon: 'pi pi-question-circle',
          command: () => this.onClose.emit(),
        },
      ],
    },
    {
      label: 'Planeación',
      items: [
        {
          label: 'Platillos',
          icon: 'pi pi-question-circle',
          routerLink: `/${NAV_BASE_URL.privado}/${NAV_PRIVADO_URL.platillos}`,
          command: () => this.onClose.emit(),
        },
        {
          label: 'Minuta sintética',
          icon: 'pi pi-question-circle',
          routerLink: `/${NAV_BASE_URL.privado}/${NAV_PRIVADO_URL.minutaSintetica}`,
          command: () => this.onClose.emit(),
        },
      ],
    },
    {
      label: 'Ordenes y reportes',
      items: [
        {
          label: 'Órdenes',
          icon: 'pi pi-question-circle',
          routerLink: `/${NAV_BASE_URL.privado}/${NAV_PRIVADO_URL.ordenes}`,
          command: () => this.onClose.emit(),
        },
        {
          label: 'Reportes',
          icon: 'pi pi-question-circle',
          routerLink: `/${NAV_BASE_URL.privado}/${NAV_PRIVADO_URL.reportes}`,
          command: () => this.onClose.emit(),
        },
        {
          label: 'Solicitud extraordinaria al proveedor',
          icon: 'pi pi-question-circle',
          routerLink: `/${NAV_BASE_URL.privado}/${NAV_PRIVADO_URL.solicitudExtraordinariaProveedor}`,
          command: () => this.onClose.emit(),
        },
      ],
    },
    {
      label: 'Atención médica',
      items: [
        {
          label: 'Módulo médico',
          icon: 'pi pi-question-circle',
          routerLink: `/${NAV_BASE_URL.privado}/${NAV_PRIVADO_URL.moduloMedico}`,
          command: () => this.onClose.emit(),
        },
      ],
    },
    {
      label: 'Administración',
      items: [
        {
          label: 'Abasto',
          icon: 'pi pi-question-circle',
          routerLink: `/${NAV_BASE_URL.privado}/${NAV_PRIVADO_URL.abasto}`,
          command: () => this.onClose.emit(),
        },
      ],
    },
  ];

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.visible()) return;

    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.onClose.emit();
    }
  }
}
