interface Tech {
  name: string;
  isPrimary?: boolean;
}

export interface TechCategory {
  name: string;
  technologies: Tech[];
}

export const techCategoriesData: TechCategory[] = [
  {
    name: 'Frontend',
    technologies: [
      { name: 'Angular', isPrimary: true },
      { name: 'React', isPrimary: true },
      { name: 'TypeScript', isPrimary: true },
      { name: 'RxJS' },
      { name: 'Tailwind CSS' },
      { name: 'WebGL' },
      { name: 'Vite' },
      { name: 'Nx' },
    ],
  },
  {
    name: 'Backend',
    technologies: [
      { name: 'Node.js', isPrimary: true },
      { name: 'NestJS', isPrimary: true },
      { name: 'Go' },
      { name: 'Python' },
      { name: 'GraphQL' },
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'Redis' },
    ],
  },
  {
    name: 'DevOps & Cloud',
    technologies: [
      { name: 'Docker', isPrimary: true },
      { name: 'Kubernetes' },
      { name: 'GitHub Actions', isPrimary: true },
      { name: 'AWS' },
      { name: 'Google Cloud' },
      { name: 'Vercel' },
      { name: 'Terraform' },
    ],
  },
  {
    name: 'Data & AI',
    technologies: [
      { name: 'TensorFlow' },
      { name: 'PyTorch' },
      { name: 'OpenAI API', isPrimary: true },
      { name: 'LangChain' },
      { name: 'D3.js' },
      { name: 'Grafana' },
      { name: 'BigQuery' },
    ],
  },
];
