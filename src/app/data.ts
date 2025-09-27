

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

export const NAV_LINKS: NavLink[] = [
    { label: 'About Us', href: '#about' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Team', href: '#team' },
    { label: 'Labs', href: '#labs' },
    { label: 'Contact', href: '#contact' },
];

export const MEGA_MENU_DATA: MegaMenuLink[] = [
  {
    label: 'Services',
    children: [
      {
        title: 'Design',
        items: [
          { label: 'UI/UX Design', href: '#services', iconPath: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125' }
        ]
      },
      {
        title: 'Development',
        items: [
          { label: 'Web Applications', href: '#services', iconPath: 'M6.75 7.5l-3.75 3.75 3.75 3.75M17.25 7.5l-3.75 3.75 3.75 3.75' },
          { label: 'Mobile Apps', href: '#services', iconPath: 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3' },
          { label: 'Cloud Solutions', href: '#services', iconPath: 'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.5 4.5 0 002.25 15z' }
        ]
      }
    ]
  },
  { label: 'Portfolio', href: '#portfolio' },
  {
    label: 'About',
    children: [
      { title: 'Our Agency', items: [
        { label: 'Philosophy', href: '#philosophy', iconPath: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-3.741 0a9.094 9.094 0 013.741-.479 3 3 0 01-4.682-2.72m-3.741 0a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72M3.12 3.12a9.094 9.094 0 013.741-.479 3 3 0 014.682 2.72m0 0a9.094 9.094 0 003.741.479 3 3 0 004.682 2.72M3.12 3.12a9.094 9.094 0 00-3.741.479 3 3 0 004.682 2.72m0 0a9.094 9.094 0 01-3.741.479 3 3 0 01-4.682 2.72' },
        { label: 'Ethos', href: '#ethos', iconPath: 'M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V5.75A2.25 2.25 0 0018 3.5H6A2.25 2.25 0 003.75 5.75v12.25A2.25 2.25 0 006 20.25z' },
        { label: 'The Team', href: '#team', iconPath: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-3.741 0a9.094 9.094 0 013.741-.479 3 3 0 01-4.682-2.72m-3.741 0a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72M3.12 3.12a9.094 9.094 0 013.741-.479 3 3 0 014.682 2.72m0 0a9.094 9.094 0 003.741.479 3 3 0 004.682 2.72M3.12 3.12a9.094 9.094 0 00-3.741.479 3 3 0 004.682 2.72m0 0a9.094 9.094 0 01-3.741.479 3 3 0 01-4.682 2.72' }
      ]}
    ]
  },
  {
    label: 'Insights',
    children: [
      { title: 'From the Agency', items: [
        { label: 'Blog', href: '#insights', iconPath: 'M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z' },
        { label: 'Labs', href: '#labs', iconPath: 'M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-2.474-1.73-1.254h2.338l.99-2.261.99 2.261h2.338l-1.73 1.254.569 2.474-2.51-2.225z' }
      ]}
    ]
  },
  { label: 'Careers', href: '#careers' },
];


export const CLIENTS: Client[] = [
    { name: 'Tuple' },
    { name: 'Mirage' },
    { name: 'Statamic' },
    { name: 'SavvyCal' },
    { name: 'Transistor' },
    { name: 'Reform' },
];

export const STATS: StatItem[] = [
    {
      iconPath: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      value: 120,
      label: 'Projects Completed',
      suffix: '+'
    },
    {
      iconPath: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
      value: 8,
      label: 'Years in Business',
      suffix: '+'
    },
    {
      iconPath: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345h5.375c.525 0 .734.686.364 1.04l-4.343 3.152a.563.563 0 00-.182.635l2.125 5.111a.563.563 0 01-.84.606l-4.343-3.152a.563.563 0 00-.666 0l-4.343-3.152a.563.563 0 01-.84-.606l2.125-5.111a.563.563 0 00-.182-.635l-4.343-3.152a.563.563 0 01.364-1.04h5.375a.563.563 0 00.475-.345l2.125-5.111z',
      value: 98,
      label: 'Client Satisfaction',
      suffix: '%'
    },
    {
      iconPath: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582',
      value: 15,
      label: 'Countries Served',
      suffix: '+'
    }
];

export const PHILOSOPHY_PRINCIPLES: Philosophy[] = [
    {
      iconPath: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125',
      title: 'Digital Craftsmanship',
      description: 'We believe in building digital products with the same care and attention to detail as a master artisan. Every line of code, every pixel, and every interaction is meticulously crafted for elegance, performance, and durability.',
      keyPractices: ['Clean & Testable Code', 'Pixel-Perfect UI', 'Performance Optimization']
    },
    {
      iconPath: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-3.741 0a9.094 9.094 0 013.741-.479 3 3 0 01-4.682-2.72m-3.741 0a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72M3.12 3.12a9.094 9.094 0 013.741-.479 3 3 0 014.682 2.72m0 0a9.094 9.094 0 003.741.479 3 3 0 004.682 2.72M3.12 3.12a9.094 9.094 0 00-3.741.479 3 3 0 004.682 2.72m0 0a9.094 9.094 0 01-3.741.479 3 3 0 01-4.682 2.72',
      title: 'Strategic Partnership',
      description: 'We are more than just developers; we are your dedicated partners in success. We immerse ourselves in your business to understand your goals, providing strategic guidance and proactive solutions that drive real business value.',
      keyPractices: ['Deep Business Immersion', 'Proactive Communication', 'Data-Driven Insights']
    },
    {
      iconPath: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Uncompromising Quality',
      description: 'Quality is not an afterthought; it is the foundation of everything we do. Through rigorous testing, automated quality assurance, and adherence to the highest standards, we deliver robust, secure, and flawless digital experiences.',
      keyPractices: ['Rigorous QA & Testing', 'Security First Approach', 'Continuous Integration']
    },
    {
      iconPath: 'M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-2.474-1.73-1.254h2.338l.99-2.261.99 2.261h2.338l-1.73 1.254.569 2.474-2.51-2.225z',
      title: 'Human-Centric Design',
      description: 'We design for humans first. Our process is rooted in empathy, creating intuitive and accessible interfaces that are a joy to use. We believe technology should empower users and simplify complexity, not create it.',
      keyPractices: ['User Research & Empathy', 'Accessible (WCAG) Design', 'Iterative Prototyping']
    }
];

export const STELLARDEV_ETHOS: StellarDevEthos[] = [
  {
    letter: 'S',
    title: 'Strategic',
    description: 'Our process is rooted in architectural forensics. We don\'t just write code; we build strategic blueprints that align technology with tangible business outcomes. Every engagement begins with a deep immersion into your market landscape and operational goals, ensuring the final product is not merely functional, but a powerful engine for growth and a definitive competitive advantage.',
    iconPath: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z' // Bolt
  },
  {
    letter: 'T',
    title: 'Tailored',
    description: 'We reject the notion of one-size-fits-all solutions. Like a master tailor, we practice digital craftsmanship, building bespoke applications that are meticulously sculpted to fit the unique contours of your business. From custom-fit architecture to pixel-perfect user interfaces, every element is designed to amplify your brand identity and streamline your specific workflows.',
    iconPath: 'M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z' // ViewfinderCircle
  },
  {
    letter: 'E',
    title: 'Elegant',
    description: 'We define elegance as the seamless marriage of form and function. It\'s the art of concealing immense complexity behind an intuitive, human-centric interface. This philosophy extends to our code, which is written with a clarity and efficiency that ensures both performance and maintainability, resulting in digital experiences that are as powerful under the hood as they are beautiful on the surface.',
    iconPath: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125' // PaintBrush
  },
  {
    letter: 'L',
    title: 'Lasting',
    description: 'Our work is engineered for longevity. We build digital assets, not disposable products. By focusing on scalable architectures, durable codebases, and forward-thinking technology choices, we ensure your application is a lasting investment that can adapt, grow, and thrive alongside your business, standing resilient against the shifting tides of technology.',
    iconPath: 'M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.092 1.209-.138 2.43-.138 3.662a48.678 48.678 0 007.462 0zM19.5 12v3.25c0 .621-.504 1.125-1.125 1.125H5.625c-.621 0-1.125-.504-1.125-1.125V12m14.25 0a48.667 48.667 0 00-7.162 0M19.5 12a48.667 48.667 0 01-7.162 0M12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5z' // BuildingLibrary
  },
  {
    letter: 'L',
    title: 'Lean',
    description: 'Efficiency is the cornerstone of our methodology. We practice lean principles to relentlessly eliminate waste, focusing every ounce of effort on what delivers maximum value to your users and your bottom line. Through disciplined agile sprints, we ensure a rapid, iterative delivery cycle that gets your product to market faster, without ever sacrificing the meticulous quality that is our hallmark.',
    iconPath: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' // Heart
  },
  {
    letter: 'A',
    title: 'Agile',
    description: 'In a dynamic digital world, rigidity is a liability. Our agile process is our strategic advantage, designed to embrace change and harness the power of continuous feedback. We operate in transparent, iterative cycles, ensuring you are an integral part of the development journey and that the final product is perfectly adapted to meet evolving market demands and user needs.',
    iconPath: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.182-3.182m0-4.991v4.99' // ArrowPath
  },
  {
    letter: 'R',
    title: 'Robust',
    description: 'Robustness is a non-negotiable mandate. Our applications are fortified from the ground up with enterprise-grade security protocols and engineered for resilient performance. Through exhaustive testing and automated quality assurance, we deliver battle-tested solutions that operate flawlessly under pressure, safeguarding your data and ensuring unwavering reliability for your users.',
    iconPath: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' // ShieldCheckIcon
  },
  {
    letter: 'D',
    title: 'Driven',
    description: 'We are more than a vendor; we are your dedicated digital partner. Our team is fueled by an intrinsic passion for the craft and an unwavering commitment to your success. We are proactive by nature, constantly looking over the horizon to identify opportunities for innovation that will not just meet your requirements, but actively drive your business forward.',
    iconPath: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a16.985 16.985 0 01-5.84 0M12 12.03a16.985 16.985 0 01-5.84 0M12 12.03a16.985 16.985 0 015.84 0M12 12.03a6 6 0 015.84-7.38v4.82m-5.84 2.56a6 6 0 01-5.84-7.38v4.82' // ChartPie
  },
  {
    letter: 'E',
    title: 'Evolving',
    description: 'Stagnation is the enemy of excellence. We are a culture of perpetual learners, dedicated to the continuous evolution of our skills and processes. Our commitment to research and development ensures we are always mastering the next generation of tools and techniques, allowing us to build future-proof solutions that leverage the very best the digital world has to offer.',
    iconPath: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.2658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5z' // AcademicCap
  },
  {
    letter: 'V',
    title: 'Visionary',
    description: 'We believe technology\'s true power lies in its ability to bring visionary ideas to life. We act as your partners in innovation, looking beyond the immediate roadmap to explore what\'s possible. By fusing ambitious thinking with elite execution, we help you create not just an application, but a visionary digital product that can define the future of your industry.',
    iconPath: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.184m-1.5.184a6.01 6.01 0 01-1.5-.184m3.75 7.482c.075-.015.15-.03.225-.045m-3.975 0a6.017 6.017 0 01-2.225-.045M12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z' // LightBulb
  }
];

export const SERVICES: Service[] = [
    {
      id: 'angular_ent',
      iconPath: 'M12 0L2 3.969v16.062L12 24l10-3.969V3.969L12 0zm7.063 18.313L12 20.813l-7.063-2.5v-10.5L12 5.188l7.063 2.625v10.5zM12 6.563l-4.375 1.625v2.812L12 12.625l4.375-1.625V8.188L12 6.563zm0 7.5L7.625 12.5v-1.25L12 12.875l4.375-1.625v1.25L12 14.063z',
      title: 'Angular Enterprise App',
      description: 'Robust, scalable, and maintainable applications for mission-critical business needs.',
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
      description: 'Dynamic and interactive Single-Page Applications with a focus on component-driven UI.',
      offerings: [
        'Component Library Development',
        'Server-Side Rendering (Next.js)',
        'State Management (Redux/Zustand)',
        'GraphQL Integration'
      ]
    },
    {
      id: 'static_site',
      iconPath: 'M6.75 7.5l-3.75 3.75 3.75 3.75M17.25 7.5l-3.75 3.75 3.75 3.75',
      title: 'Static Site (HTML/CSS/JS)',
      description: 'Blazing-fast, secure, and SEO-friendly websites for marketing and content.',
      offerings: [
        'Jamstack Architecture',
        'Performance Optimization',
        'Static Site Generators (Astro/Eleventy)',
        'Accessibility Compliance'
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
    }
];

export const ENGAGEMENT_MODELS: EngagementModel[] = [
    {
        iconPath: 'M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V5.75A2.25 2.25 0 0018 3.5H6A2.25 2.25 0 003.75 5.75v12.25A2.25 2.25 0 006 20.25z',
        title: 'Project-Based',
        description: 'Ideal for well-defined projects with a clear scope. We provide a fixed price and timeline, ensuring predictable delivery.',
        features: ['Fixed Scope & Budget', 'Defined Timeline', 'Milestone-Based Payments']
    },
    {
        iconPath: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
        title: 'Dedicated Team',
        description: 'An extension of your own team. Perfect for long-term projects and evolving requirements, offering maximum flexibility.',
        features: ['Full-Time Dedicated Experts', 'Agile & Flexible Scope', 'Monthly Billing']
    },
    {
        iconPath: 'M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.092 1.209-.138 2.43-.138 3.662a48.678 48.678 0 007.462 0zM19.5 12v3.25c0 .621-.504 1.125-1.125 1.125H5.625c-.621 0-1.125-.504-1.125-1.125V12m14.25 0a48.667 48.667 0 00-7.162 0M19.5 12a48.667 48.667 0 01-7.162 0M12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5z',
        title: 'Retainer',
        description: 'Ongoing support, maintenance, and feature enhancements for your existing applications to ensure they remain robust and up-to-date.',
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


export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    imageUrl: 'https://picsum.photos/seed/portfolio1/800/600',
    category: 'Web Application',
    title: 'Fintech Dashboard for QuantumLeap',
    tags: ['Angular', 'D3.js', 'Node.js', 'PostgreSQL'],
    description: 'A comprehensive financial analytics platform for a leading fintech startup, providing real-time data visualization and portfolio management.',
    challenge: 'The client needed to process and visualize millions of data points in real-time without sacrificing performance or user experience.',
    solution: 'We built a highly optimized Angular frontend with D3.js for custom charting, backed by a Node.js API and a TimescaleDB instance for handling time-series data efficiently.',
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
    solution: 'Through extensive user research and A/B testing, we designed a streamlined, mobile-first interface. We also created a comprehensive design system to ensure brand consistency.',
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
    solution: 'React Native was chosen for its cross-platform capabilities. We used AWS Amplify for the backend, providing a scalable serverless architecture for user authentication, data, and AI modeling.',
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
    solution: 'We built a server-side rendered React application with Next.js for optimal performance. The backend infrastructure was defined with Terraform and deployed on a Kubernetes cluster for resilience.',
    gallery: [
      'https://picsum.photos/seed/gallery4a/1200/800',
      'https://picsum.photos/seed/gallery4b/1200/800',
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
    {
        step: '01',
        title: 'Discovery & Strategy',
        description: 'We begin by immersing ourselves in your business to understand your vision, goals, and challenges.',
        iconPath: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.184m-1.5.184a6.01 6.01 0 01-1.5-.184m3.75 7.482c.075-.015.15-.03.225-.045m-3.975 0a6.017 6.017 0 01-2.225-.045M12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z',
        subPoints: ['Stakeholder Workshops', 'Competitive Analysis', 'Technology Assessment', 'Project Roadmap']
    },
    {
        step: '02',
        title: 'Design & Prototyping',
        description: 'Our design team translates strategy into a beautiful and intuitive user experience, validated through user feedback.',
        iconPath: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125',
        subPoints: ['Wireframing & User Flows', 'High-Fidelity UI Design', 'Interactive Prototyping', 'Usability Testing']
    },
    {
        step: '03',
        title: 'Agile Development',
        description: 'We build your product in iterative sprints, allowing for flexibility and continuous feedback throughout the process.',
        iconPath: 'M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V5.75A2.25 2.25 0 0018 3.5H6A2.25 2.25 0 003.75 5.75v12.25A2.25 2.25 0 006 20.25z',
        subPoints: ['Two-Week Sprints', 'Daily Standups', 'Sprint Demos', 'Continuous Integration']
    },
    {
        step: '04',
        title: 'Quality Assurance',
        description: 'Rigorous testing is integrated into every stage of development to ensure a secure, performant, and bug-free product.',
        iconPath: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        subPoints: ['Automated Unit & E2E Testing', 'Manual & Exploratory Testing', 'Performance & Security Audits', 'Cross-Browser Testing']
    },
    {
        step: '05',
        title: 'Deployment & Launch',
        description: 'We handle the entire deployment process, ensuring a smooth and seamless launch of your application.',
        iconPath: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
        subPoints: ['Infrastructure Setup (IaC)', 'CI/CD Pipeline Configuration', 'Zero-Downtime Deployment', 'Post-Launch Monitoring']
    },
    {
        step: '06',
        title: 'Support & Evolution',
        description: 'Our partnership doesn’t end at launch. We provide ongoing support and help you evolve your product with new features.',
        iconPath: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.182-3.182m0-4.991v4.99',
        subPoints: ['Maintenance Retainers', 'Performance Monitoring', 'Feature Development', 'Strategic Roadmapping']
    }
];

export const TEAM_MEMBERS: TeamMember[] = [
    {
        imageUrl: 'https://picsum.photos/seed/team1/300/300',
        name: 'Alexandria Chen',
        title: 'Founder & CEO',
        socials: {
            twitter: '#',
            linkedin: '#'
        }
    },
    {
        imageUrl: 'https://picsum.photos/seed/team2/300/300',
        name: 'Benjamin Carter',
        title: 'Lead Architect',
        socials: {
            twitter: '#',
            linkedin: '#'
        }
    },
    {
        imageUrl: 'https://picsum.photos/seed/team3/300/300',
        name: 'Chloe Rodriguez',
        title: 'Head of Design',
        socials: {
            twitter: '#',
            linkedin: '#'
        }
    },
    {
        imageUrl: 'https://picsum.photos/seed/team4/300/300',
        name: 'David Lee',
        title: 'Principal Engineer',
        socials: {
            twitter: '#',
            linkedin: '#'
        }
    }
];

export const JOB_OPENINGS: JobOpening[] = [
    {
        position: 'Senior Angular Engineer',
        location: 'Remote (US Timezones)',
        type: 'Full-time'
    },
    {
        position: 'Lead UI/UX Designer',
        location: 'Remote (Global)',
        type: 'Full-time'
    },
    {
        position: 'DevOps Engineer (AWS)',
        location: 'Remote (EU Timezones)',
        type: 'Contract'
    }
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
    {
        id: 'code-matrix',
        iconPath: 'M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V5.75A2.25 2.25 0 0018 3.5H6A2.25 2.25 0 003.75 5.75v12.25A2.25 2.25 0 006 20.25z',
        title: 'Code Matrix Live Wallpaper',
        description: 'An interactive, animated background simulating the iconic "digital rain" effect, built with pure JavaScript and HTML5 Canvas.',
        tags: ['Canvas', 'Animation', 'JS'],
        url: 'https://codepen.io'
    },
    {
        iconPath: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582',
        title: 'Real-time Visitor Globe',
        description: 'A stunning 3D globe visualization of simulated real-time website traffic using Three.js and WebGL.',
        tags: ['Three.js', 'WebGL', 'Data Viz'],
        url: '#' // This is handled internally
    },
    {
        iconPath: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345h5.375c.525 0 .734.686.364 1.04l-4.343 3.152a.563.563 0 00-.182.635l2.125 5.111a.563.563 0 01-.84.606l-4.343-3.152a.563.563 0 00-.666 0l-4.343-3.152a.563.563 0 01-.84-.606l2.125-5.111a.563.563 0 00-.182-.635l-4.343-3.152a.563.563 0 01.364-1.04h5.375a.563.563 0 00.475-.345l2.125-5.111z',
        title: 'Reactive Form State Visualizer',
        description: 'An open-source Angular library for debugging complex reactive forms by visualizing the state tree and validity in real-time.',
        tags: ['Angular', 'OSS', 'Tooling'],
        url: 'https://github.com'
    }
];

export const BLOG_POSTS: BlogPost[] = [
    {
        imageUrl: 'https://picsum.photos/seed/blog1/800/600',
        category: 'Technology',
        title: 'The Case for Zoneless Angular',
        excerpt: 'Exploring the future of Angular performance by moving beyond Zone.js. We dive into the benefits, challenges, and practical implementation of zoneless applications.',
        url: '#',
        authorName: 'Benjamin Carter',
        authorAvatarUrl: 'https://picsum.photos/seed/team2/48/48',
        date: 'June 12, 2024',
        readTime: 8,
        content: [
            { type: 'p', text: 'Angular has long relied on Zone.js to provide its magic-like automatic change detection. While this has been a cornerstone of the framework\'s developer experience, it comes with performance overhead and can sometimes lead to unexpected behavior. The future, however, is pointing towards a "zoneless" world, where developers have more granular control over when and how their components update.'},
            { type: 'h2', text: 'Why Go Zoneless?'},
            { type: 'p', text: 'The primary motivation is performance. By removing Zone.js, you eliminate the overhead of monkey-patching browser APIs and the constant change detection cycles. This results in faster applications, especially on complex pages with many components. It also aligns Angular more closely with modern reactive patterns seen in other frameworks, making it easier to reason about application state and updates.'},
        ]
    },
    {
        imageUrl: 'https://picsum.photos/seed/blog2/800/600',
        category: 'Design',
        title: 'Building a Scalable Design System',
        excerpt: 'A design system is more than just a component library. It’s a living product that unites teams and accelerates development. Here’s our approach to building one.',
        url: '#',
        authorName: 'Chloe Rodriguez',
        authorAvatarUrl: 'https://picsum.photos/seed/team3/48/48',
        date: 'May 28, 2024',
        readTime: 6,
        content: [
             { type: 'p', text: 'In a growing organization, maintaining design consistency across multiple products and teams can be a monumental challenge. A well-crafted design system is the solution. It provides a single source of truth for UI components, design patterns, and guidelines, ensuring a cohesive user experience and enabling teams to build faster and more efficiently.' },
             { type: 'h2', text: 'Our Core Principles' },
             { type: 'p', text: 'We approach design systems with three core principles: clarity, collaboration, and scalability. Every component must have clear documentation. The system must be built with input from both designers and developers. And finally, it must be architected to evolve and grow alongside the products it supports.' },
        ]
    },
    {
        imageUrl: 'https://picsum.photos/seed/blog3/800/600',
        category: 'Strategy',
        title: 'The ROI of a Discovery Phase',
        excerpt: 'Why skipping the discovery phase is the most expensive mistake you can make. We break down how a thorough initial strategy phase saves time, money, and headaches.',
        url: '#',
        authorName: 'Alexandria Chen',
        authorAvatarUrl: 'https://picsum.photos/seed/team1/48/48',
        date: 'May 15, 2024',
        readTime: 5,
        content: [
            { type: 'p', text: 'In the rush to start development, it can be tempting to skip the initial discovery and strategy phase. This is often a critical mistake. A proper discovery phase is not just about gathering requirements; it\'s about aligning business goals with user needs and technical feasibility. It\'s the foundation upon which a successful project is built.' },
            { type: 'h2', text: 'Measuring the Return' },
            { type: 'p', text: 'The return on investment (ROI) of a discovery phase manifests in several ways: reduced scope creep, fewer costly late-stage changes, a more accurate project timeline and budget, and ultimately, a final product that actually solves the right problem for the right users. Investing time upfront prevents wasting significant resources down the line.' },
        ]
    }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    avatarUrl: 'placeholder',
    quote: 'This spot is reserved for a future industry leader. We build partnerships that redefine markets and set new standards for excellence.',
    name: 'Market Disruptor',
    title: 'CEO & Visionary',
    company: 'Your Company Here',
    rating: 0
  },
  {
    avatarUrl: 'placeholder',
    quote: 'Our next success story could be yours. We are actively seeking ambitious partners ready to build the future of their industry.',
    name: 'Emerging Innovator',
    title: 'Founder',
    company: 'Your Company Here',
    rating: 0
  },
  {
    avatarUrl: 'placeholder',
    quote: 'We\'re not just building apps; we\'re building legacies. This space is waiting for a partner with a bold vision and a drive to succeed.',
    name: 'Enterprise Pioneer',
    title: 'CTO',
    company: 'Your Company Here',
    rating: 0
  },
  {
    avatarUrl: 'placeholder',
    quote: 'Dedicated to craftsmanship and quality, we are reserving this accolade for a client who shares our passion for creating exceptional digital experiences.',
    name: 'Creative Trailblazer',
    title: 'Head of Product',
    company: 'Your Company Here',
    rating: 0
  },
  {
    avatarUrl: 'placeholder',
    quote: 'The pursuit of excellence is a journey we take with our partners. This testimonial slot is earmarked for our next groundbreaking collaboration.',
    name: 'Next-Gen Scale-Up',
    title: 'VP of Engineering',
    company: 'Your Company Here',
    rating: 0
  },
  {
    avatarUrl: 'placeholder',
    quote: 'Innovation meets execution. We are looking for a forward-thinking partner to feature here and showcase what\'s possible in the digital realm.',
    name: 'Future Unicorn',
    title: 'Founder',
    company: 'Your Company Here',
    rating: 0
  },
  {
    avatarUrl: 'placeholder',
    quote: 'This testimonial awaits the story of a successful launch and a market transformed. Let\'s write it together.',
    name: 'Global Brand',
    title: 'Director of Digital',
    company: 'Your Company Here',
    rating: 0
  },
  {
    avatarUrl: 'placeholder',
    quote: 'The future is unwritten. We have the pen. This space is reserved for the next chapter in digital innovation.',
    name: 'Ambitious Startup',
    title: 'Co-Founder',
    company: 'Your Company Here',
    rating: 0
  }
];

export const AWARDS: Award[] = [
    {
        title: 'Webby Awards Honoree',
        issuer: 'The International Academy of Digital Arts and Sciences',
        year: '2024'
    },
    {
        title: 'Awwwards Site of the Day',
        issuer: 'Awwwards',
        year: '2023'
    },
    {
        title: 'Top Angular Developers',
        issuer: 'Clutch.co',
        year: '2023'
    },
    {
        title: 'CSS Design Awards Winner',
        issuer: 'CSSDA',
        year: '2022'
    }
];

export const FAQS: FaqItem[] = [
  {
    question: 'What is the typical timeline for a project?',
    answer: 'A typical project timeline ranges from 3 to 6 months, depending on the complexity and scope. A simple marketing website might take 4-6 weeks, while a complex web application could take 6 months or more. We provide a detailed project roadmap with key milestones after the initial discovery phase.',
    category: 'General',
    isPopular: true
  },
  {
    question: 'How much does a project cost?',
    answer: 'Project costs vary significantly based on the scope. We offer a pricing calculator for a ballpark estimate. For a detailed, fixed-price quote, we recommend scheduling a free consultation so we can understand your specific needs.',
    category: 'Pricing',
    isPopular: true
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'We specialize in modern web technologies. Our primary frontend framework is Angular, but we are also experts in React. For the backend, we typically use Node.js with TypeScript. Our cloud expertise is centered around AWS and Google Cloud Platform. You can see a more detailed list in our Technology section.',
    category: 'Technical',
    isPopular: true
  },
  {
    question: 'How do you handle project management?',
    answer: 'We follow an agile methodology, typically working in two-week sprints. You will have a dedicated project manager and direct communication with our team through a shared Slack channel and weekly check-in meetings. We use tools like Jira and Notion for tracking progress and documentation.',
    category: 'Process'
  },
  {
    question: 'Do you offer support and maintenance after launch?',
    answer: 'Yes, we offer ongoing support and maintenance through our Retainer engagement model. This ensures your application remains secure, up-to-date, and performant. We can also work with you to plan and develop new features post-launch.',
    category: 'Support'
  },
  {
    question: 'Can you work with my existing team?',
    answer: 'Absolutely. We are experienced in collaborating with in-house design and development teams. We can integrate into your existing workflow or provide expert guidance to augment your team\'s capabilities.',
    category: 'General'
  },
];

export const CONTACT_INFO: ContactInfo[] = [
    {
        iconPath: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
        title: 'Email Us',
        value: 'hello@stellardev.agency',
        href: 'mailto:hello@stellardev.agency'
    },
    {
        iconPath: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z',
        title: 'Call Us',
        value: '+1 (555) 123-4567',
        href: 'tel:+15551234567'
    },
    {
        iconPath: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
        title: 'Visit Us',
        value: '123 Digital Ave, Tech City',
        href: '#'
    }
];

export const SOCIAL_LINKS: SocialLink[] = [
    { name: 'Twitter', href: '#', iconPath: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
    { name: 'LinkedIn', href: '#', iconPath: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    { name: 'GitHub', href: '#', viewBox: '0 0 16 16', iconPath: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z' },
];

export const PRIVACY_POLICY: LegalContent = {
    title: 'Privacy Policy',
    lastUpdated: 'May 25, 2024',
    content: [
        { type: 'p', text: 'StellarDev Agency ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by StellarDev Agency.' },
        { type: 'h2', text: 'Information We Collect' },
        { type: 'p', text: 'We collect information you provide directly to us, such as when you fill out a contact form. This may include your name, email address, phone number, and any other information you choose to provide.' },
        { type: 'h2', text: 'Use of Information' },
        { type: 'p', text: 'We use the information we collect to respond to your inquiries, provide you with our services, and communicate with you about news and updates.' },
    ]
};

export const TERMS_OF_SERVICE: LegalContent = {
    title: 'Terms of Service',
    lastUpdated: 'May 25, 2024',
    content: [
        { type: 'p', text: 'Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the stellardev.agency website (the "Service") operated by StellarDev Agency ("us", "we", or "our").' },
        { type: 'h2', text: 'Accounts' },
        { type: 'p', text: 'When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.' },
        { type: 'h2', text: 'Intellectual Property' },
        { type: 'p', text: 'The Service and its original content, features and functionality are and will remain the exclusive property of StellarDev Agency and its licensors.' },
    ]
};

// Pricing Calculator Data
export const CALCULATOR_SERVICES: CalculatorService[] = [
  { id: 'angular_ent', name: 'Angular Enterprise App', basePrice: 45000 },
  { id: 'react_spa', name: 'React SPA', basePrice: 40000 },
  { id: 'static_site', name: 'Static Site (HTML/CSS/JS)', basePrice: 5000 },
  { id: 'headless_cms', name: 'Headless CMS Integration', basePrice: 12000 },
  { id: 'ui_ux', name: 'UI/UX Design', basePrice: 8000 },
  { id: 'mobile_app', name: 'Mobile App', basePrice: 25000 },
  { id: 'cloud', name: 'Cloud & DevOps', basePrice: 10000 },
];

export const CALCULATOR_FEATURES: CalculatorFeature[] = [
  { id: 'auth', name: 'User Authentication', description: 'User sign-up, login, and profile management.', priceModifier: 0.15 },
  { id: 'cms', name: 'Content Management', description: 'Ability for admins to update website content.', priceModifier: 0.20 },
  { id: 'ecommerce', name: 'E-commerce', description: 'Product listings, shopping cart, and payments.', priceModifier: 0.35 },
  { id: 'dashboard', name: 'Analytics Dashboard', description: 'Data visualization and reporting.', priceModifier: 0.25 },
  { id: 'api', name: 'Third-Party API Integrations', description: 'Connecting with external services.', priceModifier: 0.20 },
];

export const CALCULATOR_SCOPES: CalculatorScope[] = [
  { id: 'poc', name: 'Proof of Concept', description: 'A minimal build to test a key hypothesis and validate market potential.', multiplier: 0.5 },
  { id: 'mvp', name: 'MVP', description: 'A launch-ready product with core functionalities to attract early adopters.', multiplier: 1.0 },
  { id: 'full_product', name: 'Full Product', description: 'A polished, feature-complete application ready for a full market launch.', multiplier: 1.75 },
  { id: 'growth', name: 'Growth Platform', description: 'A scalable system with added analytics and marketing integrations.', multiplier: 2.5 },
  { id: 'enterprise', name: 'Enterprise System', description: 'A robust, large-scale solution with advanced security and integrations.', multiplier: 4.0 },
];

export const CALCULATOR_COMPLEXITIES: CalculatorScope[] = [
  { id: 'basic', name: 'Basic', description: 'Minimal business logic with a clean, template-based user interface.', multiplier: 0.8 },
  { id: 'standard', name: 'Standard', description: 'Typical business logic, CRUD operations, and a semi-custom UI design.', multiplier: 1.0 },
  { id: 'advanced', name: 'Advanced', description: 'Complex business logic, custom UI animations, and API integrations.', multiplier: 1.5 },
  { id: 'expert', name: 'Expert', description: 'Real-time data, multiple complex integrations, and advanced state management.', multiplier: 2.25 },
  { id: 'mission_critical', name: 'Mission-Critical', description: 'Enterprise-grade security and adherence to strict compliance standards.', multiplier: 3.5 },
];

// Status Page Data
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

// New Data for Security Dashboard
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
