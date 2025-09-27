import { CalculatorService, CalculatorFeature, CalculatorScope } from '../models';

export const CALCULATOR_SERVICES: CalculatorService[] = [
  // Existing Services with BRL pricing
  { id: 'angular_ent', name: 'Angular Enterprise App', basePrice: 45000, basePriceBRL: 150000 },
  { id: 'react_spa', name: 'React SPA', basePrice: 40000, basePriceBRL: 120000 },
  { id: 'mobile_app', name: 'Mobile App', basePrice: 25000, basePriceBRL: 80000 },
  { id: 'ui_ux', name: 'UI/UX Design', basePrice: 8000, basePriceBRL: 25000 },
  { id: 'cloud', name: 'Cloud & DevOps', basePrice: 10000, basePriceBRL: 35000 },
  { id: 'headless_cms', name: 'Headless CMS Integration', basePrice: 12000, basePriceBRL: 40000 },
  
  // New, more accessible services
  { id: 'landing_page', name: 'Landing Page Blueprint', basePrice: 3500, basePriceBRL: 12000 },
  { id: 'arch_audit', name: 'Architectural Audit', basePrice: 4000, basePriceBRL: 15000 },
  { id: 'brand_sprint', name: 'Brand Identity Sprint', basePrice: 6000, basePriceBRL: 20000 },
  { id: 'perf_triage', name: 'Performance Triage', basePrice: 500, basePriceBRL: 2500 },
  { id: 'a11y_scan', name: 'Accessibility Quick-Scan', basePrice: 400, basePriceBRL: 2000 },
  { id: 'seo_foundations', name: 'Technical SEO Foundation', basePrice: 600, basePriceBRL: 3000 }
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