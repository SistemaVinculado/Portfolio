import { Component, ChangeDetectionStrategy, signal, inject, computed, OnInit, OnDestroy, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { DataService } from '../data.service';
import { LogEntry } from '../models';

@Component({
  selector: 'app-security-dashboard',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective],
  templateUrl: './security-dashboard.component.html',
  styleUrls: ['./security-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('logContainer') private logContainer!: ElementRef<HTMLDivElement>;
  
  private dataService = inject(DataService);
  private logInterval: number | undefined;

  activeTab = signal<'performance' | 'vulnerability'>('performance');
  logEntries = signal<LogEntry[]>([]);
  showInfoTooltip = signal(false);

  // Data Signals
  performanceReports = this.dataService.performanceReports;
  vulnerabilityScans = this.dataService.vulnerabilityScans;
  securityMetrics = this.dataService.securityMetrics;

  // Computed properties for summary cards
  overallPerformanceScore = computed(() => {
    const reports = this.performanceReports();
    if (reports.length === 0) return 0;
    const total = reports.reduce((acc, r) => acc + r.lighthouseScore, 0);
    return Math.round(total / reports.length);
  });

  criticalVulnerabilities = computed(() => {
    return this.vulnerabilityScans().filter(s => s.severity === 'Critical' && s.status !== 'Patched').length;
  });

  threatsBlocked = computed(() => {
      const threatsMetric = this.securityMetrics().find(m => m.metric === 'Threats Blocked');
      return threatsMetric ? threatsMetric.value : 'N/A';
  });


  readonly circumference = 2 * Math.PI * 16; // r = 16

  constructor() {
    effect(() => {
      // Trigger effect when log entries change to scroll down
      this.logEntries();
      this.scrollToBottom();
    });
  }

  ngOnInit(): void {
    this.generateInitialLogs();
    this.logInterval = window.setInterval(() => this.addLogEntry(), 2500);
  }

  ngOnDestroy(): void {
    if (this.logInterval) {
      clearInterval(this.logInterval);
    }
  }

  toggleInfoTooltip(): void {
    this.showInfoTooltip.update(v => !v);
  }

  setTab(tab: 'performance' | 'vulnerability'): void {
    this.activeTab.set(tab);
  }

  getSeverityClass(severity: 'Critical' | 'High' | 'Medium' | 'Low'): string {
    switch (severity) {
      case 'Critical': return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700/50';
      case 'High': return 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-700/50';
      case 'Medium': return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700/50';
      case 'Low': return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700/50';
    }
  }

  getScoreColor(score: number): string {
    if (score >= 90) return 'text-green-500 dark:text-green-400';
    if (score >= 50) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  }

  getStatusIcon(status: 'passing' | 'improving' | 'needs_work'): { path: string, class: string } {
    switch(status) {
      case 'passing': return { path: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z', class: 'text-green-500 dark:text-green-400' };
      case 'improving': return { path: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z', class: 'text-yellow-500 dark:text-yellow-400' };
      case 'needs_work': return { path: 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z', class: 'text-red-500 dark:text-red-400' };
    }
  }
  
  private generateInitialLogs(): void {
    const initialLogs: LogEntry[] = [
      { timestamp: this.getTimestamp(-15), level: 'INFO', message: 'Initializing StellarShield™ kernel...' },
      { timestamp: this.getTimestamp(-12), level: 'INFO', message: 'WAF firewall active on all edge nodes.' },
      { timestamp: this.getTimestamp(-8), level: 'SUCCESS', message: 'System integrity check passed.' },
      { timestamp: this.getTimestamp(-5), level: 'INFO', message: 'Real-time monitoring service started.' },
    ];
    this.logEntries.set(initialLogs);
  }

  private addLogEntry(): void {
    const random = Math.random();
    let newLog: LogEntry;

    if (random < 0.7) {
      const messages = ['Incoming request from valid IP', 'Cache hit for resource /assets/logo.svg', 'User authentication successful', 'API call to /data/stream authorized'];
      newLog = { timestamp: this.getTimestamp(), level: 'INFO', message: messages[Math.floor(Math.random() * messages.length)] };
    } else if (random < 0.9) {
      const messages = ['Unusual traffic pattern detected from ASN-14061', 'Failed login attempt for user `admin`'];
      newLog = { timestamp: this.getTimestamp(), level: 'WARN', message: messages[Math.floor(Math.random() * messages.length)] };
    } else if (random < 0.98){
      newLog = { timestamp: this.getTimestamp(), level: 'SUCCESS', message: 'Threat signature `XSS.Probe.v2` blocked.' };
    } else {
      newLog = { timestamp: this.getTimestamp(), level: 'CRITICAL', message: 'Potential SQL injection attempt blocked.' };
    }

    this.logEntries.update(logs => {
        const newLogs = [...logs, newLog];
        // Keep the log from growing indefinitely
        if (newLogs.length > 50) {
            return newLogs.slice(newLogs.length - 50);
        }
        return newLogs;
    });
  }

  private getTimestamp(offsetSeconds: number = 0): string {
    const now = new Date();
    now.setSeconds(now.getSeconds() + offsetSeconds);
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  }

  private scrollToBottom(): void {
    if (this.logContainer?.nativeElement) {
      // Defer to allow the view to update first
      setTimeout(() => {
        this.logContainer.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight;
      }, 0);
    }
  }
}