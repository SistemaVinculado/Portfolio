export interface NavLink {
  label: string;
  href: string;
}

export interface Philosophy {
  iconPath: string;
  title: string;
  description: string;
  keyPractices: string[];
}

export interface Service {
  id?: string; // Add id for referencing in forms
  iconPath: string;
  title:string;
  description: string;
  offerings: string[];
}

export interface EngagementModel {
    iconPath: string;
    title: string;
    description: string;
    features: string[];
}

export interface LegalContentSection {
    type: 'h2' | 'p';
    text: string;
}

export interface LegalContent {
    title: string;
    lastUpdated: string;
    content: LegalContentSection[];
}


export interface PortfolioItem {
  imageUrl: string;
  category: string;
  title: string;
  tags: string[];
  description: string;
  challenge: string;
  solution: string;
  gallery: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  iconPath: string;
  subPoints: string[];
}

export interface TeamMember {
  imageUrl: string;
  name: string;
  title: string;
}

export interface BlogPost {
  imageUrl: string;
  category: string;
  title: string;
  excerpt: string;
  url: string;
  authorName: string;
  authorAvatarUrl: string;
  date: string;
  readTime: number; // in minutes
  content: LegalContentSection[];
}

export interface Testimonial {
  avatarUrl: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  rating: number;
}

export interface Award {
  title: string;
  issuer: string;
  year: string;
}

export interface Technology {
  name: string;
  svgLogo: string;
  related?: string[];
  category: 'Frontend' | 'Backend' | 'DevOps & Cloud' | 'Design';
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
  isPopular?: boolean;
}

export interface ContactInfo {
  iconPath: string;
  title: string;
  value: string;
  href: string;
  description?: string;
}

export interface Client {
  name: string;
}

export interface JobOpening {
  position: string;
  location: string;
  type: string;
}

export interface StatItem {
  iconPath: string;
  value: number;
  label: string;
  suffix: string;
}

export interface CalculatorService {
  id: string;
  name: string;
  basePrice: number;
  basePriceBRL?: number;
  featureIds?: string[];
}

export interface CalculatorFeature {
  id: string;
  name: string;
  description: string;
  priceModifier: number; // e.g., 0.2 for a 20% increase
}

export interface CalculatorScope {
  id: string;
  name: string;
  description: string;
  multiplier: number;
}

export interface LabExperiment {
  id?: string;
  iconPath: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
}

export interface Visitor {
  city: string;
  country: string;
  lat: number;
  lon: number;
}

export interface SystemStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  description: string;
}

export interface Incident {
  date: string;
  title: string;
  status: 'resolved' | 'monitoring' | 'investigating';
  updates: string[];
}

export interface SocialLink {
  name: string;
  href: string;
  iconPath: string;
  viewBox?: string;
}

export interface ChatMessage {
  id: number;
  role: 'user' | 'model';
  content: string;
  isError?: boolean;
}

export interface StellarDevEthos {
  letter: string;
  title: string;
  description: string;
  iconPath: string;
}

// Models for the new Mega Menu
export interface MegaMenuItem {
  label: string;
  href: string;
  iconPath: string;
}

export interface MegaMenuGroup {
  title: string;
  items: MegaMenuItem[];
}

export interface MegaMenuLink {
  label: string;
  href?: string;
  children?: (MegaMenuItem | MegaMenuGroup)[];
}

// Models for Security Dashboard
export interface SecurityMetric {
  metric: string;
  value: string;
  status: 'success' | 'warning' | 'danger';
  description: string;
}

export interface PerformanceReport {
  page: string;
  lighthouseScore: number;
  accessibilityScore: number;
  seoScore: number;
  loadTime: number; // in ms
  status: 'passing' | 'improving' | 'needs_work';
  lastScan: string;
}

export interface VulnerabilityScan {
  id: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  component: string;
  summary: string;
  status: 'Patched' | 'Investigating';
  patchedOn: string | null;
}

export interface LogEntry {
  id: number;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'CRITICAL' | 'SUCCESS';
  message: string;
}