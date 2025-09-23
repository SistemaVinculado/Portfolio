import { ClientStory } from '../models/client-story.model';

export const clientStoriesData: ClientStory[] = [
  {
    name: 'Vercel',
    logo: 'Vercel',
    category: 'PLATAFORMA FRONTEND',
    description: 'Otimizando pipelines de CI/CD para uma experiência de deploy instantânea e global para aplicações frontend complexas.',
    tags: ['Frontend', 'DevOps', 'CI/CD', 'Edge'],
    fullDescription: 'Nossa colaboração com a Vercel focou na otimização da experiência de deploy para equipes corporativas. Redesenhamos o fluxo de integração de projetos e os painéis de análise de performance, criando pipelines de CI/CD automatizados que reduziram o tempo de deploy em 70%. Isso permitiu que grandes equipes gerenciassem e implantassem suas aplicações em escala global com muito mais agilidade e confiança.',
    themeColor: '#FFFFFF', // White for Vercel's branding
  },
  {
    name: 'GitHub',
    logo: 'GitHub',
    category: 'FERRAMENTAS DE DESENV.',
    description: 'Construindo ferramentas para aprimorar o fluxo de trabalho e a colaboração de milhões de desenvolvedores.',
    tags: ['Developer Tools', 'GitHub Actions', 'API', 'Comunidade'],
    fullDescription: 'Trabalhamos com o GitHub para desenvolver uma suíte de ferramentas de produtividade, incluindo uma CLI avançada e integrações com o GitHub Actions. O objetivo era automatizar tarefas repetitivas e melhorar o fluxo de revisão de código. O resultado foi uma adoção massiva pela comunidade, com as ferramentas se tornando padrão em muitos times de desenvolvimento de código aberto e corporativo.',
    themeColor: '#E0E0E0', // Light Gray
  },
  {
    name: 'Stripe',
    logo: 'Stripe',
    category: 'INFRAESTRUTURA DE PAGAMENTOS',
    description: 'Projetando APIs robustas e seguras que simplificam a infraestrutura econômica da internet.',
    tags: ['API First', 'Fintech', 'Segurança', 'Pagamentos'],
    fullDescription: 'Fomos parceiros da Stripe no design e arquitetura de suas novas APIs de pagamentos para mercados emergentes. O desafio era criar uma API que fosse ao mesmo tempo poderosa e simples de integrar. Focamos em uma documentação impecável, SDKs idiomáticos e segurança de ponta. O projeto resultou em uma redução de 40% no tempo de integração para novos desenvolvedores e expandiu o alcance da Stripe globalmente.',
    themeColor: '#6772E5', // Stripe's Indigo
  },
  {
    name: 'OpenAI',
    logo: 'OpenAI',
    category: 'INTELIGÊNCIA ARTIFICIAL',
    description: 'Integrando modelos de linguagem de ponta para criar aplicações inteligentes e inovadoras.',
    tags: ['IA', 'LLM', 'API', 'Engenharia de Prompt'],
    fullDescription: 'Colaboramos com diversas startups para integrar a API da OpenAI em seus produtos. Desenvolvemos desde chatbots de atendimento ao cliente até ferramentas de geração de conteúdo e análise de dados. Nosso trabalho envolveu engenharia de prompt, otimização de custos e a criação de interfaces de usuário que abstraem a complexidade dos modelos de IA, tornando a tecnologia acessível e útil.',
    themeColor: '#10A37F', // OpenAI's Teal
  },
  {
    name: 'AWS Lambda',
    logo: 'AWS',
    category: 'ARQUITETURA SERVERLESS',
    description: 'Construindo backends altamente escaláveis e eficientes com arquitetura serverless na AWS.',
    tags: ['Serverless', 'Backend', 'AWS', 'Escalabilidade'],
    fullDescription: 'Para um cliente de grande escala no setor de mídia, migramos sua infraestrutura de backend monolítica para uma arquitetura serverless baseada em AWS Lambda e API Gateway. O resultado foi uma redução de 60% nos custos de infraestrutura e uma capacidade de escalar automaticamente para lidar com picos de tráfego de milhões de usuários simultâneos durante eventos ao vivo.',
    themeColor: '#FF9900', // AWS Yellow/Orange
  },
  {
    name: 'Grafana',
    logo: 'Grafana',
    category: 'OBSERVABILIDADE',
    description: 'Desenvolvendo soluções de monitoramento e visualização de dados em tempo real.',
    tags: ['Data Viz', 'Monitoramento', 'Plugins', 'Open Source'],
    fullDescription: 'Contribuímos para o ecossistema Grafana desenvolvendo plugins de visualização de dados customizados para clientes no setor financeiro. Nossos plugins permitiram a criação de dashboards de monitoramento de performance em tempo real para sistemas de trading de baixa latência, ajudando a identificar e resolver gargalos de performance de forma proativa.',
    themeColor: '#F46800', // Grafana's Orange
  },
  {
    name: 'DigitalOcean',
    logo: 'DigitalOcean',
    category: 'INFRAESTRUTURA CLOUD',
    description: 'Automatizando o provisionamento de infraestrutura para acelerar o ciclo de desenvolvimento.',
    tags: ['Cloud', 'Automação', 'IaaS', 'API'],
    fullDescription: 'Criamos uma plataforma interna de provisionamento (PaaS) para uma startup de rápido crescimento, utilizando a API da DigitalOcean. A plataforma permitiu que os desenvolvedores criassem novos ambientes de teste e produção com um único comando, reduzindo o tempo de setup de infraestrutura de horas para minutos e acelerando significativamente o ciclo de desenvolvimento e entrega.',
    themeColor: '#0080FF', // DigitalOcean Blue
  }
];
