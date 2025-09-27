import { SecurityMetric, PerformanceReport, VulnerabilityScan } from '../models';

export const SECURITY_METRICS: SecurityMetric[] = [
  { metric: 'Uptime', value: '99.99%', status: 'success', description: 'Last 30 days' },
  { metric: 'Vulnerabilities', value: '0 Critical', status: 'success', description: 'Real-time scan' },
  { metric: 'Threats Blocked', value: '1,428', status: 'success', description: 'Last 24 hours' },
];

export const PERFORMANCE_REPORTS: PerformanceReport[] = [
  { page: '/home', lighthouseScore: 98, accessibilityScore: 100, seoScore: 95, loadTime: 450, status: 'passing', lastScan: '2h ago' },
  { page: '/portfolio/fintech-dashboard', lighthouseScore: 92, accessibilityScore: 95, seoScore: 90, loadTime: 820, status: 'passing', lastScan: '2h ago' },
  { page: '/contact', lighthouseScore: 99, accessibilityScore: 100, seoScore: 98, loadTime: 310, status: 'passing', lastScan: '2h ago' },
  { page: '/blog/zoneless-angular', lighthouseScore: 88, accessibilityScore: 92, seoScore: 85, loadTime: 1150, status: 'improving', lastScan: '2h ago' },
];

export const VULNERABILITY_SCANS: VulnerabilityScan[] = [
  { id: 'CVE-2024-21892', severity: 'High', component: 'Node.js', summary: 'Improper handling of empty fragments in URL parsing.', status: 'Patched', patchedOn: '2024-07-10' },
  { id: 'GHSA-v87g-92xw-j4gq', severity: 'Medium', component: 'Express.js', summary: 'Potential open redirect vulnerability in `res.location()` header.', status: 'Patched', patchedOn: '2024-07-08' },
  { id: 'CVE-2023-45133', severity: 'Low', component: 'highlight.js', summary: 'Regular expression denial of service (ReDoS).', status: 'Patched', patchedOn: '2024-06-21' },
  { id: 'INT-SCAN-001', severity: 'Low', component: 'Internal Library', summary: 'Investigation into potential XSS vector in tooltip component.', status: 'Investigating', patchedOn: null },
];
