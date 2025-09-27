import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemStatusService } from '../services/system-status.service';
import { SystemStatus, Incident } from '../models';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';

type OverallStatus = {
  type: 'operational' | 'degraded' | 'outage' | 'maintenance';
  message: string;
};

@Component({
  selector: 'app-status-page',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  templateUrl: './status-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusPageComponent {
  private systemStatusService = inject(SystemStatusService);
  
  systemStatuses = this.systemStatusService.systemStatuses;
  incidents = this.systemStatusService.incidents;
  lastUpdated = this.systemStatusService.lastUpdated;
  
  openIncidentIndex = signal<number | null>(null);
  showDevelopmentInfo = signal(false);

  overallStatus = computed<OverallStatus>(() => {
    const statuses = this.systemStatuses();
    const outageCount = statuses.filter(s => s.status === 'outage').length;
    const degradedCount = statuses.filter(s => s.status === 'degraded').length;
    
    if (outageCount > 0) {
      return { type: 'outage', message: 'Major System Outage' };
    }
    if (degradedCount > 0) {
      return { type: 'degraded', message: 'Partial System Degradation' };
    }
    return { type: 'operational', message: 'All Systems Operational' };
  });

  statusStyles = computed(() => {
    const status = this.overallStatus().type;
    return {
      'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300': status === 'operational',
      'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300': status === 'degraded',
      'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300': status === 'outage',
    };
  });
  
  toggleIncident(index: number): void {
    this.openIncidentIndex.update(current => current === index ? null : index);
  }

  toggleDevelopmentInfo(): void {
    this.showDevelopmentInfo.update(v => !v);
  }

  getStatusIndicatorClass(status: SystemStatus['status']): string {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'outage': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }

  getIncidentIndicatorClass(status: Incident['status']): string {
    switch (status) {
      case 'resolved': return 'bg-green-500';
      case 'monitoring': return 'bg-blue-500';
      case 'investigating': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  }
}