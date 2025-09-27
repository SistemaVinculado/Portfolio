import { SystemStatus, Incident } from '../models';

export const SYSTEM_STATUSES: SystemStatus[] = [
  { name: 'Agency Website', status: 'operational', description: 'Main marketing and information site.' },
  { name: 'Client Portal', status: 'operational', description: 'Project management and communication hub.' },
  { name: 'API Services', status: 'operational', description: 'Backend services for client applications.' },
  { name: 'Email Service', status: 'operational', description: 'Inbound and outbound email delivery.' },
  { name: 'Authentication Service', status: 'operational', description: 'User login and security systems.' },
  { name: 'Cloud Infrastructure', status: 'operational', description: 'Core AWS and GCP services.' }
];

export const INCIDENTS: Incident[] = [
  {
    date: 'July 10, 2024',
    title: 'Resolved: Latency in API Services',
    status: 'resolved',
    updates: [
      '14:30 UTC - A fix has been implemented and we are monitoring the results.',
      '14:15 UTC - We have identified the root cause and are working on a fix.',
      '14:00 UTC - We are investigating reports of increased latency in our API services.'
    ]
  },
  {
    date: 'June 25, 2024',
    title: 'Resolved: Client Portal Login Issues',
    status: 'resolved',
    updates: [
      '09:45 UTC - The issue has been resolved. All users can now log in.',
      '09:30 UTC - We are investigating an issue preventing some users from logging into the client portal.'
    ]
  }
];
