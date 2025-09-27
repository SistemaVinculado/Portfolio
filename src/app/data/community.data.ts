import { LabExperiment, BlogPost } from '../models';

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
