import { Injectable, signal } from '@angular/core';
import {
    Award,
    BlogPost,
    CalculatorFeature,
    CalculatorScope,
    CalculatorService,
    Client,
    ContactInfo,
    EngagementModel,
    FaqItem,
    Incident,
    JobOpening,
    LabExperiment,
    LegalContent,
    NavLink,
    Philosophy,
    PortfolioItem,
    ProcessStep,
    Service,
    SocialLink,
    StatItem,
    StellarDevEthos,
    SystemStatus,
    TeamMember,
    Technology,
    Testimonial,
    MegaMenuLink,
    SecurityMetric,
    PerformanceReport,
    VulnerabilityScan
} from './models';
import {
    AWARDS,
    BLOG_POSTS,
    CALCULATOR_COMPLEXITIES,
    CALCULATOR_FEATURES,
    CALCULATOR_SCOPES,
    CALCULATOR_SERVICES,
    CLIENTS,
    CONTACT_INFO,
    ENGAGEMENT_MODELS,
    FAQS,
    INCIDENTS,
    JOB_OPENINGS,
    LAB_EXPERIMENTS,
    NAV_LINKS,
    PHILOSOPHY_PRINCIPLES,
    PORTFOLIO_ITEMS,
    PROCESS_STEPS,
    PRIVACY_POLICY,
    SERVICES,
    SOCIAL_LINKS,
    STATS,
    STELLARDEV_ETHOS,
    SYSTEM_STATUSES,
    TEAM_MEMBERS,
    TECHNOLOGIES,
    TERMS_OF_SERVICE,
    TESTIMONIALS,
    MEGA_MENU_DATA,
    SECURITY_METRICS,
    PERFORMANCE_REPORTS,
    VULNERABILITY_SCANS
  } from './data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  navLinks = signal<NavLink[]>(NAV_LINKS);
  megaMenuData = signal<MegaMenuLink[]>(MEGA_MENU_DATA);
  clients = signal<Client[]>(CLIENTS);
  stats = signal<StatItem[]>(STATS);
  philosophyPrinciples = signal<Philosophy[]>(PHILOSOPHY_PRINCIPLES);
  stellarDevEthos = signal<StellarDevEthos[]>(STELLARDEV_ETHOS);
  services = signal<Service[]>(SERVICES);
  engagementModels = signal<EngagementModel[]>(ENGAGEMENT_MODELS);
  technologies = signal<Technology[]>(TECHNOLOGIES);
  portfolioItems = signal<PortfolioItem[]>(PORTFOLIO_ITEMS);
  processSteps = signal<ProcessStep[]>(PROCESS_STEPS);
  teamMembers = signal<TeamMember[]>(TEAM_MEMBERS);
  jobOpenings = signal<JobOpening[]>(JOB_OPENINGS);
  labExperiments = signal<LabExperiment[]>(LAB_EXPERIMENTS);
  blogPosts = signal<BlogPost[]>(BLOG_POSTS);
  testimonials = signal<Testimonial[]>(TESTIMONIALS);
  awards = signal<Award[]>(AWARDS);
  faqs = signal<FaqItem[]>(FAQS);
  contactInfo = signal<ContactInfo[]>(CONTACT_INFO);
  socialLinks = signal<SocialLink[]>(SOCIAL_LINKS);
  privacyPolicy = signal<LegalContent>(PRIVACY_POLICY);
  termsOfService = signal<LegalContent>(TERMS_OF_SERVICE);
  calculatorServices = signal<CalculatorService[]>(CALCULATOR_SERVICES);
  calculatorFeatures = signal<CalculatorFeature[]>(CALCULATOR_FEATURES);
  calculatorScopes = signal<CalculatorScope[]>(CALCULATOR_SCOPES);
  calculatorComplexities = signal<CalculatorScope[]>(CALCULATOR_COMPLEXITIES);
  systemStatuses = signal<SystemStatus[]>(SYSTEM_STATUSES);
  incidents = signal<Incident[]>(INCIDENTS);

  // New signals for Security Dashboard
  securityMetrics = signal<SecurityMetric[]>(SECURITY_METRICS);
  performanceReports = signal<PerformanceReport[]>(PERFORMANCE_REPORTS);
  vulnerabilityScans = signal<VulnerabilityScan[]>(VULNERABILITY_SCANS);
}