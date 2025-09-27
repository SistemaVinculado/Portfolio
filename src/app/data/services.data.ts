import { Service, EngagementModel, Technology } from '../models';

export const SERVICES: Service[] = [
    {
      id: 'angular_ent',
      iconPath: 'M12 0L2 3.969v16.062L12 24l10-3.969V3.969L12 0zm7.063 18.313L12 20.813l-7.063-2.5v-10.5L12 5.188l7.063 2.625v10.5zM12 6.563l-4.375 1.625v2.812L12 12.625l4.375-1.625V8.188L12 6.563zm0 7.5L7.625 12.5v-1.25L12 12.875l4.375-1.625v1.25L12 14.063z',
      title: 'Angular Enterprise App',
      description: 'Erecting a fortress of impeccable, disciplined code for mission-critical enterprise architecture.',
      offerings: [
        'State Management (NgRx/Signals)',
        'Enterprise-Grade Security',
        'Scalable Architecture Design',
        'Performance Tuning'
      ]
    },
    {
      id: 'react_spa',
      iconPath: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.828-12.828a1 1 0 00-1.414 1.414l1.414-1.414zM12 8a4 4 0 100 8 4 4 0 000-8zm0 6a2 2 0 110-4 2 2 0 010 4zM16.242 7.758a1 1 0 10-1.414-1.414l1.414 1.414zM7.758 16.242a1 1 0 101.414 1.414L7.758 16.242z',
      title: 'React SPA',
      description: 'Composing a responsive, living sculpture of digital art for experiences that must captivate and convert.',
      offerings: [
        'Component Library Development',
        'Server-Side Rendering (Next.js)',
        'State Management (Redux/Zustand)',
        'GraphQL Integration'
      ]
    },
    {
      id: 'mobile_app',
      iconPath: 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications that perform flawlessly on iOS and Android.',
      offerings: [
        'Native iOS (Swift) & Android (Kotlin)',
        'Cross-Platform (React Native)',
        'App Store Deployment',
        'Push Notification Strategy'
      ]
    },
    {
      id: 'ui_ux',
      iconPath: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125',
      title: 'UI/UX Design',
      description: 'Human-centric design that is both beautiful and intuitive, ensuring a delightful user experience.',
      offerings: [
        'User Research & Prototyping',
        'UI & Interaction Design',
        'Design Systems',
        'Accessibility Audits'
      ]
    },
    {
      id: 'cloud',
      iconPath: 'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.5 4.5 0 002.25 15z',
      title: 'Cloud & DevOps',
      description: 'Robust cloud infrastructure and CI/CD pipelines for scalable and secure applications.',
      offerings: [
        'Cloud Architecture (AWS, GCP)',
        'CI/CD & Automation',
        'Infrastructure as Code (Terraform)',
        'Performance Monitoring'
      ]
    },
    {
      id: 'headless_cms',
      iconPath: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375',
      title: 'Headless CMS Integration',
      description: 'Decouple your content management for a more flexible and future-proof digital presence.',
      offerings: [
        'CMS Strategy & Selection',
        'Contentful, Sanity, or Strapi Setup',
        'API-Driven Content Delivery',
        'Frontend Integration'
      ]
    },
    {
      id: 'landing_page',
      iconPath: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h-1.5m-15 11.25h16.5m-16.5 0v3.75A2.25 2.25 0 006 22.5h12a2.25 2.25 0 002.25-2.25v-3.75m-16.5 0h16.5',
      title: 'Landing Page Blueprint',
      description: 'A focused, high-conversion landing page engineered for a singular marketing objective.',
      offerings: [
        'Conversion-Focused Design',
        'A/B Testing Framework',
        'Analytics Integration',
        'Blazing-Fast Performance'
      ]
    },
    {
      id: 'arch_audit',
      iconPath: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
      title: 'Architectural Audit',
      description: 'A comprehensive technical review to identify performance bottlenecks, security risks, and scalability issues.',
      offerings: [
        'Codebase Quality Analysis',
        'Security Vulnerability Scan',
        'Performance Profiling',
        'Scalability Roadmap'
      ]
    },
    {
      id: 'brand_sprint',
      iconPath: 'M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-2.474-1.73-1.254h2.338l.99-2.261.99 2.261h2.338l-1.73 1.254.569 2.474-2.51-2.225z',
      title: 'Brand Identity Sprint',
      description: 'A concentrated design sprint to establish or refine your brand\'s core visual identity for the digital space.',
      offerings: [
        'Logo & Wordmark Design',
        'Color Palette & Typography',
        'Core Brand Guidelines',
        'Digital Asset Kit'
      ]
    },
    {
      id: 'perf_triage',
      iconPath: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.182-3.182m3.182 0l-3.182 3.182',
      title: 'Performance Triage',
      description: 'A rapid diagnostic to identify and prioritize critical performance bottlenecks in your existing application.',
      offerings: [
        'Lighthouse & Core Web Vitals Analysis',
        'Bundle Size Investigation',
        'Actionable Improvement Report',
        'Initial Code-Level Recommendations'
      ]
    },
    {
      id: 'a11y_scan',
      iconPath: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
      title: 'Accessibility Quick-Scan',
      description: 'An initial audit to uncover major WCAG compliance issues and provide a path towards a more inclusive user experience.',
      offerings: [
        'Automated WCAG 2.1 AA Scan',
        'Keyboard Navigation Testing',
        'Screen Reader Compatibility Check',
        'Prioritized Remediation List'
      ]
    },
    {
      id: 'seo_foundations',
      iconPath: 'M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.773 4.773zM21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Technical SEO Foundation',
      description: 'Establish the essential technical SEO groundwork to improve your site\'s visibility and search engine ranking potential.',
      offerings: [
        'Meta Tags & Schema Markup',
        'Robots.txt & Sitemap.xml Setup',
        'Site Speed & Mobile-Friendliness Review',
        'Initial Keyword Strategy'
      ]
    }
];

export const ENGAGEMENT_MODELS: EngagementModel[] = [
    {
        iconPath: 'M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V5.75A2.25 2.25 0 0018 3.5H6A2.25 2.25 0 003.75 5.75v12.25A2.25 2.25 0 006 20.25z',
        title: 'Fixed-Scope Commission',
        description: 'For commissions with a clearly defined architectural blueprint. A fixed investment and timeline for predictable execution.',
        features: ['Fixed Scope & Budget', 'Defined Timeline', 'Milestone-Based Payments']
    },
    {
        iconPath: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
        title: 'Architect-in-Residence',
        description: 'For long-term, evolving commissions, the architect becomes an integrated part of your strategic vision, providing continuous mastery and guidance.',
        features: ['Dedicated Master Architect', 'Agile & Flexible Scope', 'Monthly Billing']
    },
    {
        iconPath: 'M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.092 1.209-.138 2.43-.138 3.662a48.678 48.678 0 007.462 0zM19.5 12v3.25c0 .621-.504 1.125-1.125 1.125H5.625c-.621 0-1.125-.504-1.125-1.125V12m14.25 0a48.667 48.667 0 00-7.162 0M19.5 12a48.667 48.667 0 01-7.162 0M12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5z',
        title: 'Stewardship Retainer',
        description: 'For the continued evolution and maintenance of a commissioned masterwork, ensuring its lasting integrity and performance.',
        features: ['Guaranteed Monthly Hours', 'Ongoing Maintenance', 'Priority Support']
    }
];

export const TECHNOLOGIES: Technology[] = [
    // Frontend
    { name: 'Angular', svgLogo: 'M12 0L2 3.969v16.062L12 24l10-3.969V3.969L12 0zm7.063 18.313L12 20.813l-7.063-2.5v-10.5L12 5.188l7.063 2.625v10.5zM12 6.563l-4.375 1.625v2.812L12 12.625l4.375-1.625V8.188L12 6.563zm0 7.5L7.625 12.5v-1.25L12 12.875l4.375-1.625v1.25L12 14.063z', category: 'Frontend', description: 'Our framework of choice for building robust, large-scale enterprise applications.', related: ['TypeScript', 'RxJS'] },
    { name: 'React', svgLogo: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.828-12.828a1 1 0 00-1.414 1.414l1.414-1.414zM12 8a4 4 0 100 8 4 4 0 000-8zm0 6a2 2 0 110-4 2 2 0 010 4zM16.242 7.758a1 1 0 10-1.414-1.414l1.414 1.414zM7.758 16.242a1 1 0 101.414 1.414L7.758 16.242z', category: 'Frontend', description: 'Utilized for its component-based architecture and vast ecosystem, ideal for dynamic UIs.', related: ['Next.js'] },
    { name: 'TypeScript', svgLogo: 'M2 2h20v20H2V2zm2 2v16h16V4H4zm3.5 3h3v1.5h-3V7zm0 3h6v1.5h-6v-1.5zm0 3h6v1.5h-6v-1.5z', category: 'Frontend', description: 'We use TypeScript in all our projects for type safety and improved developer experience.', related: ['Angular', 'Node.js'] },
    { name: 'RxJS', svgLogo: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zM7.9 14.1a1 1 0 01-1.4-1.4l4-4a1 1 0 011.4 1.4l-4 4zm4.6-1.4a1 1 0 11-1.4 1.4l-4-4a1 1 0 111.4-1.4l4 4z', category: 'Frontend', description: 'The cornerstone of reactive programming in our Angular applications for managing async operations.' },
    { name: 'Next.js', svgLogo: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z', category: 'Frontend', description: 'Our go-to React framework for server-side rendering, static site generation, and performance.' },
    // Backend
    { name: 'Node.js', svgLogo: 'M12 2l-10 6v12l10 6 10-6V8l-10-6zm-8 7.5l8 4.5 8-4.5-8-4.5-8 4.5z', category: 'Backend', description: 'The engine for our fast, scalable, and non-blocking server-side applications.', related: ['TypeScript', 'Express'] },
    { name: 'Express', svgLogo: 'M2 7h20v10H2V7zm2 2v6h16V9H4z', category: 'Backend', description: 'A minimal and flexible Node.js framework for building robust APIs and web servers.' },
    { name: 'GraphQL', svgLogo: 'M12 2a10 10 0 100 20 10 10 0 000-20zm-5 13.59V8.41l5 3.59-5 1.41zm10-7.18l-5 3.59 5 1.41V8.41z', category: 'Backend', description: 'For creating powerful and efficient APIs that give clients exactly the data they need.' },
    { name: 'PostgreSQL', svgLogo: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z', category: 'Backend', description: 'Our relational database of choice for its reliability, feature robustness, and performance.' },
    // DevOps
    { name: 'AWS', svgLogo: 'M12 2a10 10 0 100 20 10 10 0 000-20zM6.8 15.2a.5.5 0 01-.7-.7l5-5a.5.5 0 01.7.7l-5 5zm5.4 0l-5-5a.5.5 0 01.7-.7l5 5a.5.5 0 01-.7.7z', category: 'DevOps & Cloud', description: 'We leverage AWS for its comprehensive suite of services, from compute to serverless.', related: ['Docker', 'Terraform'] },
    { name: 'Docker', svgLogo: 'M21.93 9.47a1.5 1.5 0 00-2.36-1.9L16 10.33V5a1 1 0 00-1-1H9a1 1 0 00-1 1v5.33l-3.57-2.76a1.5 1.5 0 00-2.36 1.9L5.4 12l-3.33 2.53a1.5 1.5 0 101.9 2.36L7 14.67V20a1 1 0 001 1h6a1 1 0 001-1v-5.33l2.67 2.05a1.5 1.5 0 101.9-2.36L18.6 12l3.33-2.53zM14 19H10v-4h4v4z', category: 'DevOps & Cloud', description: 'Containerization is key to our development workflow, ensuring consistency across all environments.' },
    { name: 'Terraform', svgLogo: 'M2 12l10-10 10 10-10 10L2 12zm2.83 0L12 4.83 19.17 12 12 19.17 4.83 12z', category: 'DevOps & Cloud', description: 'For managing infrastructure as code, allowing for repeatable and predictable deployments.' },
    { name: 'Kubernetes', svgLogo: 'M12 2l-10 5v10l10 5 10-5V7L12 2zm-1 15.37V12H5.63L4 12.81V9.19L11 6.63v5.37zm2 0V12h5.37L20 12.81V9.19L13 6.63v5.37z', category: 'DevOps & Cloud', description: 'The orchestrator for our containerized applications, enabling high availability and scalability.' },
    // Design
    { name: 'Figma', svgLogo: 'M12 2a10 10 0 100 20 10 10 0 000-20zm-2 13.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0-5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0-5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z', category: 'Design', description: 'The collaborative heart of our design process, from wireframes to high-fidelity prototypes.' },
];