import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AlertService } from '@core/services/alert.service';
import { Alert } from '@core/utils/alert.model';

enum AlertType {
  Success = 0,
  Error = 1,
  Info = 2,
  Warning = 3,
}

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.html',
  styleUrls: ['./alerta.scss'],
})
export class Alerta implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly alertService = inject(AlertService);

  private readonly destroy$ = new Subject<void>();

  public readonly id = input<string>('default-alerta');
  public readonly fade = input<boolean>(true);
  public readonly autoCloseTime = input<number>(6000);

  public readonly alerts = signal<Alert[]>([]);

  ngOnInit() {
    this.subscribeToAlerts();
    this.subscribeToRouteChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToAlerts(): void {
    this.alertService
      .onAlert(this.id())
      .pipe(takeUntil(this.destroy$))
      .subscribe((alert) => {
        if (!alert.message) {
          this.alerts.update((currentAlerts) => {
            const filtered = currentAlerts.filter((x) => x.keepAfterRouteChange);
            return filtered.map((remainingAlert) => ({
              ...remainingAlert,
              keepAfterRouteChange: false,
            }));
          });
          return;
        }

        this.alerts.update((currentAlerts) => [...currentAlerts, alert]);

        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), this.autoCloseTime());
        }
      });
  }

  private subscribeToRouteChanges(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.alertService.clear(this.id());
      });
  }

  public removeAlert(alert: Alert): void {
    const alertExists = this.alerts().some((x) => x.message === alert.message);
    if (!alertExists) {
      return;
    }

    if (this.fade()) {
      this.alerts.update((currentAlerts) =>
        currentAlerts.map((x) => (x.message === alert.message ? { ...x, fade: true } : x)),
      );

      setTimeout(() => {
        this.alerts.update((currentAlerts) =>
          currentAlerts.filter((x) => x.message !== alert.message),
        );
      }, 250);
    } else {
      this.alerts.update((currentAlerts) =>
        currentAlerts.filter((x) => x.message !== alert.message),
      );
    }
  }

  public close(alert: Alert): void {
    this.alerts.update((currentAlerts) => currentAlerts.filter((x) => x.message !== alert.message));
  }

  public cssClass(alert: Alert): string {
    if (!alert) return '';

    const alertTypeClasses: Record<AlertType, string> = {
      [AlertType.Success]: 'alerta-success',
      [AlertType.Error]: 'alerta-danger',
      [AlertType.Info]: 'alerta-info',
      [AlertType.Warning]: 'alerta-warning',
    };

    const typeClass = alertTypeClasses[alert.type as AlertType] || '';
    return `alert ${typeClass}`;
  }

  public cssIcon(alert: Alert): string {
    if (!alert) return '';

    const alertTypeIcons: Record<AlertType, string> = {
      [AlertType.Success]: 'placa-alerta-check',
      [AlertType.Error]: '#exclamation-circle-fill',
      [AlertType.Info]: '#info-fill',
      [AlertType.Warning]: '#exclamation-triangle-fill',
    };

    return alertTypeIcons[alert.type as AlertType] || '';
  }
}
