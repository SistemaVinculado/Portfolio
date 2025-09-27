import { PortfolioItem, ProcessStep } from '../models';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    imageUrl: 'https://picsum.photos/seed/portfolio1/800/600',
    category: 'Web Application',
    title: 'Fintech Dashboard for QuantumLeap',
    tags: ['Angular', 'D3.js', 'Node.js', 'PostgreSQL'],
    description: 'A comprehensive financial analytics platform for a leading fintech startup, providing real-time data visualization and portfolio management.',
    challenge: 'The client needed to process and visualize millions of data points in real-time without sacrificing performance or user experience.',
    solution: 'A highly optimized Angular frontend was built with D3.js for custom charting, backed by a Node.js API and a TimescaleDB instance for handling time-series data efficiently.',
    gallery: [
      'https://picsum.photos/seed/gallery1a/1200/800',
      'https://picsum.photos/seed/gallery1b/1200/800',
    ]
  },
  {
    imageUrl: 'https://picsum.photos/seed/portfolio2/800/600',
    category: 'UI/UX Design',
    title: 'E-commerce Redesign for Aura',
    tags: ['Figma', 'User Research', 'Design System'],
    description: 'A complete overhaul of an e-commerce platform for a luxury wellness brand, focusing on a minimalist aesthetic and a seamless checkout experience.',
    challenge: 'The existing user journey was complex and led to high cart abandonment rates. The brand identity needed a digital refresh to match its premium physical products.',
    solution: 'Through extensive user research and A/B testing, a streamlined, mobile-first interface was designed. A comprehensive design system was also created to ensure brand consistency.',
    gallery: [
      'https://picsum.photos/seed/gallery2a/1200/800',
      'https://picsum.photos/seed/gallery2b/1200/800',
    ]
  },
  {
    imageUrl: 'https://picsum.photos/seed/portfolio3/800/600',
    category: 'Mobile App',
    title: 'Health & Fitness App for Synapse',
    tags: ['React Native', 'GraphQL', 'AWS Amplify'],
    description: 'A cross-platform mobile app that offers personalized workout plans and nutrition tracking, powered by AI recommendations.',
    challenge: 'To create a single codebase that delivers a native-like performance on both iOS and Android, while integrating with various health data sources.',
    solution: 'React Native was chosen for its cross-platform capabilities. AWS Amplify was used for the backend, providing a scalable serverless architecture for user authentication, data, and AI modeling.',
    gallery: [
      'https://picsum.photos/seed/gallery3a/1200/800',
      'https://picsum.photos/seed/gallery3b/1200/800',
    ]
  },
  {
    imageUrl: 'https://picsum.photos/seed/portfolio4/800/600',
    category: 'Web Application',
    title: 'SaaS Platform for NexusFlow',
    tags: ['React', 'Next.js', 'Terraform', 'Kubernetes'],
    description: 'A multi-tenant SaaS platform for project management, featuring real-time collaboration tools and customizable workflows.',
    challenge: 'The architecture needed to be highly scalable and secure to support thousands of concurrent users across different organizations.',
    solution: 'A server-side rendered React application was built with Next.js for optimal performance. The backend infrastructure was defined with Terraform and deployed on a Kubernetes cluster for resilience.',
    gallery: [
      'https://picsum.photos/seed/gallery4a/1200/800',
      'https://picsum.photos/seed/gallery4b/1200/800',
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
    {
        step: '01',
        title: 'Consultation & Blueprint',
        description: 'Every commission begins with a deep immersion into your vision to establish the foundational architectural blueprint.',
        iconPath: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.184m-1.5.184a6.01 6.01 0 01-1.5-.184m3.75 7.482c.075-.015.15-.03.225-.045m-3.975 0a6.017 6.017 0 01-2.225-.045M12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z',
        subPoints: ['Vision Alignment', 'Strategic Forensics', 'Technology Assessment', 'Architectural Roadmap']
    },
    {
        step: '02',
        title: 'Architectural Design',
        description: 'The blueprint is translated into a tangible, human-centric design, validated through rigorous prototyping.',
        iconPath: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125',
        subPoints: ['Interaction Wireframing', 'High-Fidelity UI Design', 'Interactive Prototypes', 'Design Validation']
    },
    {
        step: '03',
        title: 'Disciplined Forging',
        description: 'The digital masterwork is forged in disciplined, iterative sprints, ensuring flexibility and continuous dialogue.',
        iconPath: 'M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V5.75A2.25 2.25 0 0018 3.5H6A2.25 2.25 0 003.75 5.75v12.25A2.25 2.25 0 006 20.25z',
        subPoints: ['Two-Week Sprints', 'Direct Architect Access', 'Sprint Demonstrations', 'Continuous Integration']
    },
    {
        step: '04',
        title: 'Integrity Assurance',
        description: 'Exhaustive testing is integrated into every stage to ensure an architecture of uncompromising integrity.',
        iconPath: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        subPoints: ['Automated Unit & E2E Testing', 'Manual & Exploratory QA', 'Performance & Security Audits', 'Cross-Device Validation']
    },
    {
        step: '05',
        title: 'Deployment & Unveiling',
        description: 'The entire deployment process is managed by the architect, ensuring a seamless and elegant unveiling.',
        iconPath: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
        subPoints: ['Infrastructure as Code (IaC)', 'CI/CD Pipeline Automation', 'Zero-Downtime Deployment', 'Post-Launch Monitoring']
    },
    {
        step: '06',
        title: 'Stewardship & Evolution',
        description: 'The commission does not end at launch. The architect provides ongoing stewardship to evolve the masterwork.',
        iconPath: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.182-3.182m0-4.991v4.99',
        subPoints: ['Stewardship Retainers', 'Performance Monitoring', 'Next-Phase Development', 'Strategic Roadmapping']
    }
];