import { Client, StatItem, Philosophy, StellarDevEthos, TeamMember, JobOpening, Award, SocialLink } from '../models';

export const CLIENTS: Client[] = [
    { name: 'tuple' },
    { name: 'mirage' },
    { name: 'statamic' },
    { name: 'savvycal' },
    { name: 'transistor' },
    { name: 'reform' },
];

export const STATS: StatItem[] = [
    {
      iconPath: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      value: 24,
      label: 'commissions',
      suffix: '+'
    },
    {
      iconPath: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
      value: 8,
      label: 'mastery',
      suffix: '+'
    },
    {
      iconPath: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345h5.375c.525 0 .734.686.364 1.04l-4.343 3.152a.563.563 0 00-.182.635l2.125 5.111a.563.563 0 01-.84.606l-4.343-3.152a.563.563 0 00-.666 0l-4.343-3.152a.563.563 0 01-.84-.606l2.125-5.111a.563.563 0 00-.182-.635l-4.343-3.152a.563.563 0 01.364-1.04h5.375a.563.563 0 00.475-.345l2.125-5.111z',
      value: 100,
      label: 'integrity',
      suffix: '%'
    },
    {
      iconPath: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582',
      value: 15,
      label: 'presence',
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

export const SOCIAL_LINKS: SocialLink[] = [
    { name: 'Twitter', href: '#', iconPath: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
    { name: 'LinkedIn', href: '#', iconPath: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    { name: 'GitHub', href: '#', viewBox: '0 0 16 16', iconPath: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z' },
];