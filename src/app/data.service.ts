import { Injectable, signal, computed, inject } from '@angular/core';
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
    VulnerabilityScan,
    MegaMenuGroup
} from './models';
import { AWARDS, CLIENTS, JOB_OPENINGS, PHILOSOPHY_PRINCIPLES, SOCIAL_LINKS, STATS, STELLARDEV_ETHOS, TEAM_MEMBERS } from './data/company.data';
import { BLOG_POSTS, LAB_EXPERIMENTS } from './data/community.data';
import { CALCULATOR_COMPLEXITIES, CALCULATOR_FEATURES, CALCULATOR_SCOPES, CALCULATOR_SERVICES } from './data/calculator.data';
import { CONTACT_INFO, FAQS, TESTIMONIALS } from './data/customer-support.data';
import { PRIVACY_POLICY, TERMS_OF_SERVICE } from './data/legal.data';
import { MEGA_MENU_DATA, NAV_LINKS } from './data/navigation.data';
import { PORTFOLIO_ITEMS, PROCESS_STEPS } from './data/portfolio.data';
import { PERFORMANCE_REPORTS, SECURITY_METRICS, VULNERABILITY_SCANS } from './data/security.data';
import { ENGAGEMENT_MODELS, SERVICES, TECHNOLOGIES } from './data/services.data';
import { INCIDENTS, SYSTEM_STATUSES } from './data/status.data';
import { TextContentService } from './services/text-content.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private textService = inject(TextContentService);
  private t = this.textService.get.bind(this.textService);

  // --- Translated Signals ---
  
  navLinks = computed(() => NAV_LINKS.map(link => ({
    ...link,
    label: this.t(`nav.${link.label.toLowerCase()}`)()
  })));

  megaMenuData = computed(() => {
    const isMegaMenuGroup = (item: any): item is MegaMenuGroup => item.items !== undefined;
    
    return MEGA_MENU_DATA.map(link => {
      // Translate top-level link
      const translatedLink = {
        ...link,
        label: this.t(`nav.${link.label.toLowerCase()}`)(),
      };

      // Translate children if they exist
      if (translatedLink.children) {
        translatedLink.children = translatedLink.children.map(child => {
          if (isMegaMenuGroup(child)) {
            return {
              ...child,
              title: this.t(`megaMenu.groupTitles.${child.title.replace(/\s+/g, '_').toLowerCase()}`)(),
              items: child.items.map(item => ({
                ...item,
                label: this.t(`megaMenu.items.${item.label.replace(/[\s/&]+/g, '_').toLowerCase()}`)()
              }))
            };
          } else {
            return {
              ...child,
              label: this.t(`megaMenu.items.${child.label.replace(/\s+/g, '_').toLowerCase()}`)()
            };
          }
        });
      }
      return translatedLink;
    });
  });

  clients = computed(() => CLIENTS.map(client => ({
    ...client,
    name: this.t(`data.clients.${client.name}`)()
  })));

  stats = computed(() => STATS.map(stat => ({
    ...stat,
    label: this.t(`data.stats.${stat.label.toLowerCase().replace(/ /g, '_')}`)()
  })));
  
  philosophyPrinciples = computed(() => PHILOSOPHY_PRINCIPLES.map((p, i) => ({
      ...p,
      title: this.t(`philosophy.p${i+1}.title`)(),
      description: this.t(`philosophy.p${i+1}.description`)(),
      keyPractices: p.keyPractices.map((_, j) => this.t(`philosophy.p${i+1}.practices.${j}`)())
  })));
  
  stellarDevEthos = computed(() => {
    // Handle duplicate letters
    let lCount = 0;
    let eCount = 0;
    return STELLARDEV_ETHOS.map((e) => {
      let key = e.letter;
      if (key === 'L') {
        lCount++;
        if (lCount > 1) key = `L${lCount}`;
      }
      if (key === 'E') {
        eCount++;
        if (eCount > 1) key = `E${eCount}`;
      }
      return {
        ...e,
        title: this.t(`ethos.${key}.title`)(),
        description: this.t(`ethos.${key}.description`)(),
      }
    });
  });

  services = computed(() => SERVICES.map(service => ({
    ...service,
    title: this.t(`services.${service.id}.title`)(),
    description: this.t(`services.${service.id}.description`)(),
    offerings: service.offerings.map((_, i) => this.t(`services.${service.id}.offerings.${i}`)())
  })));

  engagementModels = computed(() => ENGAGEMENT_MODELS.map((model, i) => ({
      ...model,
      title: this.t(`engagementModels.m${i+1}.title`)(),
      description: this.t(`engagementModels.m${i+1}.description`)(),
      features: model.features.map((_, j) => this.t(`engagementModels.m${i+1}.features.${j}`)())
  })));

  technologies = computed(() => TECHNOLOGIES.map(tech => ({
      ...tech,
      name: this.t(`technologies.names.${tech.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}`)(),
      category: this.t(`technologies.categories.${tech.category.toLowerCase().replace(' & ', '_')}`)() as any,
      description: this.t(`technologies.descriptions.${tech.name.replace(/[^a-zA-Z0-9]/g, '')}`)()
  })));
  
  portfolioItems = computed(() => PORTFOLIO_ITEMS.map((item, i) => ({
      ...item,
      category: this.t(`portfolio.categories.${item.category.toLowerCase().replace(/ /g, '_')}`)(),
      title: this.t(`portfolio.item${i+1}.title`)(),
      description: this.t(`portfolio.item${i+1}.description`)(),
      challenge: this.t(`portfolio.item${i+1}.challenge`)(),
      solution: this.t(`portfolio.item${i+1}.solution`)(),
  })));

  processSteps = computed(() => PROCESS_STEPS.map(step => ({
      ...step,
      title: this.t(`processSteps.s${step.step}.title`)(),
      description: this.t(`processSteps.s${step.step}.description`)(),
      subPoints: step.subPoints.map((_, i) => this.t(`processSteps.s${step.step}.subPoints.${i}`)())
  })));

  testimonials = computed(() => TESTIMONIALS.map((t, i) => ({
      ...t,
      quote: this.t(`testimonials.t${i+1}.quote`)(),
      name: this.t(`testimonials.t${i+1}.name`)(),
      title: this.t(`testimonials.t${i+1}.title`)(),
      company: this.t(`testimonials.t${i+1}.company`)()
  })));
  
  faqs = computed(() => FAQS.map((faq, i) => ({
      ...faq,
      question: this.t(`faqs.q${i+1}.question`)(),
      answer: this.t(`faqs.q${i+1}.answer`)(),
      category: this.t(`faqs.categories.${faq.category.toLowerCase()}`)()
  })));
  
  privacyPolicy = computed(() => ({
      ...PRIVACY_POLICY,
      title: this.t('legal.privacy.title')(),
      lastUpdated: PRIVACY_POLICY.lastUpdated,
      content: PRIVACY_POLICY.content.map((section, i) => ({
          ...section,
          text: this.t(`legal.privacy.content.${i}.text`)()
      }))
  }));

  termsOfService = computed(() => ({
      ...TERMS_OF_SERVICE,
      title: this.t('legal.terms.title')(),
      lastUpdated: TERMS_OF_SERVICE.lastUpdated,
      content: TERMS_OF_SERVICE.content.map((section, i) => ({
          ...section,
          text: this.t(`legal.terms.content.${i}.text`)()
      }))
  }));

  calculatorScopes = computed(() => CALCULATOR_SCOPES.map(scope => ({
      ...scope,
      name: this.t(`calculator.scopes.${scope.id}.name`)(),
      description: this.t(`calculator.scopes.${scope.id}.description`)()
  })));

  calculatorComplexities = computed(() => CALCULATOR_COMPLEXITIES.map(complexity => ({
      ...complexity,
      name: this.t(`calculator.complexities.${complexity.id}.name`)(),
      description: this.t(`calculator.complexities.${complexity.id}.description`)()
  })));

  systemStatuses = computed(() => SYSTEM_STATUSES.map((status, i) => ({
      ...status,
      description: this.t(`status.systems.${i}.description`)()
  })));

  incidents = computed(() => INCIDENTS.map((incident, i) => ({
      ...incident,
      title: this.t(`status.incidents.${i}.title`)(),
      updates: incident.updates.map((_, j) => this.t(`status.incidents.${i}.updates.${j}`)())
  })));
  
  contactInfo = computed(() => CONTACT_INFO.map(info => ({
    ...info,
    title: this.t(`components.contact.${info.title}`)(),
    description: info.description ? this.t(`components.contact.${info.description}`)() : undefined
  })));
  
  teamMembers = computed(() => TEAM_MEMBERS.map((member, i) => ({
    ...member,
    title: this.t(`team.member${i+1}.title`)(),
  })));

  jobOpenings = computed(() => JOB_OPENINGS.map((job, i) => ({
    ...job,
    position: this.t(`jobs.job${i+1}.position`)(),
    location: this.t(`jobs.job${i+1}.location`)(),
    type: this.t(`jobs.job${i+1}.type`)(),
  })));

  labExperiments = computed(() => LAB_EXPERIMENTS.map((exp, i) => ({
      ...exp,
      title: this.t(`labExperiments.exp${i+1}.title`)(),
      description: this.t(`labExperiments.exp${i+1}.description`)(),
  })));

  blogPosts = computed(() => BLOG_POSTS.map((post, i) => ({
      ...post,
      category: this.t(`blogPosts.post${i+1}.category`)(),
      title: this.t(`blogPosts.post${i+1}.title`)(),
      excerpt: this.t(`blogPosts.post${i+1}.excerpt`)(),
      content: post.content.map((section, j) => ({
        ...section,
        text: this.t(`blogPosts.post${i+1}.content.${j}.text`)()
      }))
  })));

  awards = computed(() => AWARDS.map((award, i) => ({
    ...award,
    title: this.t(`awards.award${i+1}.title`)(),
    issuer: this.t(`awards.award${i+1}.issuer`)(),
  })));

  securityMetrics = computed(() => this.securityMetricsSignal().map((metric, i) => ({
    ...metric,
    metric: this.t(`security.metrics.${i}.metric`)(),
    description: this.t(`security.metrics.${i}.description`)(),
  })));

  vulnerabilityScans = computed(() => this.vulnerabilityScansSignal().map((scan, i) => ({
    ...scan,
    severity: this.t(`security.severities.${scan.severity.toLowerCase()}`)(),
    summary: this.t(`security.scans.${i}.summary`)(),
    status: this.t(`security.statuses.${scan.status.toLowerCase()}`)(),
  })));
  
  // --- Non-translated signals ---
  socialLinks = signal<SocialLink[]>(SOCIAL_LINKS);
  calculatorServices = signal<CalculatorService[]>(CALCULATOR_SERVICES);
  calculatorFeatures = signal<CalculatorFeature[]>(CALCULATOR_FEATURES);
  
  // --- Signals for simulated data ---
  private securityMetricsSignal = signal<SecurityMetric[]>(SECURITY_METRICS);
  performanceReports = signal<PerformanceReport[]>(PERFORMANCE_REPORTS);
  private vulnerabilityScansSignal = signal<VulnerabilityScan[]>(VULNERABILITY_SCANS);

  /**
   * Simulates real-time updates for the security dashboard.
   */
  public simulateSecurityDataUpdate(): void {
    // 1. Simulate performance report fluctuations
    this.performanceReports.update(reports => {
      return reports.map(report => {
        const scoreChange = Math.round((Math.random() - 0.5) * 2); // -1, 0, or 1
        const timeChange = Math.round((Math.random() - 0.5) * 20); // +/- 10ms
        return {
          ...report,
          lighthouseScore: Math.max(85, Math.min(100, report.lighthouseScore + scoreChange)),
          loadTime: Math.max(200, report.loadTime + timeChange),
        };
      });
    });

    // 2. Simulate vulnerability patching
    this.vulnerabilityScansSignal.update(scans => {
      if (Math.random() < 0.2) {
        const investigatingScan = scans.find(s => s.status === 'Investigating');
        if (investigatingScan) {
          investigatingScan.status = 'Patched';
          investigatingScan.patchedOn = new Date().toISOString().split('T')[0];
        }
      }
      return [...scans];
    });

    // 3. Simulate threats blocked metric increasing
    this.securityMetricsSignal.update(metrics => {
      const threatsMetric = metrics.find(m => m.metric === 'Threats Blocked');
      if (threatsMetric) {
        const currentValue = parseInt(threatsMetric.value.replace(/,/g, ''), 10);
        const newValue = currentValue + Math.floor(Math.random() * 5);
        threatsMetric.value = newValue.toLocaleString();
      }
      return [...metrics];
    });
  }
}
