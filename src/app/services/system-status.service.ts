import { Injectable, OnDestroy, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SystemStatus, Incident } from '../models';
import { SYSTEM_STATUSES, INCIDENTS } from '../data';

@Injectable({
  providedIn: 'root'
})
export class SystemStatusService implements OnDestroy {
  // Deep copy initial data to prevent modifying the constants
  systemStatuses = signal<SystemStatus[]>(JSON.parse(JSON.stringify(SYSTEM_STATUSES)));
  incidents = signal<Incident[]>(INCIDENTS);
  lastUpdated = signal(new Date());

  private updateInterval: number | undefined;

  constructor() {
    if (isPlatformBrowser(globalThis)) {
      this.updateInterval = window.setInterval(() => this._checkForUpdates(), 15000);
    }
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  private _checkForUpdates(): void {
    this.lastUpdated.set(new Date());

    this.systemStatuses.update(currentStatuses => {
      const newStatuses = JSON.parse(JSON.stringify(currentStatuses));

      // Small chance to revert a non-operational system back to operational
      const nonOperational = newStatuses.filter((s: SystemStatus) => s.status !== 'operational');
      if (nonOperational.length > 0 && Math.random() < 0.3) { // 30% chance to heal
        const toHeal: SystemStatus = nonOperational[Math.floor(Math.random() * nonOperational.length)];
        toHeal.status = 'operational';
      }

      // Small chance for a new issue
      if (Math.random() < 0.1) { // 10% chance for a new problem
        const operational = newStatuses.filter((s: SystemStatus) => s.status === 'operational');
        if (operational.length > 0) {
          const toBreak: SystemStatus = operational[Math.floor(Math.random() * operational.length)];
          // 70% chance of degraded, 30% chance of outage
          toBreak.status = Math.random() < 0.7 ? 'degraded' : 'outage';
        }
      }
      
      return newStatuses;
    });
  }
}