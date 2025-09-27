import { Testimonial, FaqItem, ContactInfo } from '../models';

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

export const FAQS: FaqItem[] = [
  {
    question: 'What is the typical timeline for a commission?',
    answer: 'A typical commission timeline ranges from 3 to 6 months, depending on architectural complexity. A focused marketing site might take 4-6 weeks, while a complex web application could take 6 months or more. A detailed commission roadmap with key milestones is established after the initial consultation.',
    category: 'General',
    isPopular: true
  },
  {
    question: 'What is the investment for a commission?',
    answer: 'The investment for a commission varies significantly based on its scope. The Commission Blueprint calculator provides a ballpark estimate. For a detailed, fixed-price proposal, a formal consultation is required to fully understand the vision and architectural requirements.',
    category: 'Pricing',
    isPopular: true
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'The architect specializes in modern web technologies. The primary framework for enterprise commissions is Angular. For dynamic UIs, React is employed. The backend is typically built on Node.js with TypeScript, with cloud architecture centered on AWS and Google Cloud Platform. The full technology ecosystem is detailed on the Services page.',
    category: 'Technical',
    isPopular: true
  },
  {
    question: 'How is a commission managed?',
    answer: 'The commission process follows a disciplined agile methodology, typically working in two-week sprints. You will have a direct line of communication with the architect. Progress and documentation are managed through a shared, transparent system.',
    category: 'Process'
  },
  {
    question: 'Do you offer stewardship after launch?',
    answer: 'Yes. Through the Stewardship & Evolution retainer, the architect provides ongoing support, maintenance, and strategic enhancements to ensure your masterwork remains secure, performant, and aligned with your evolving goals.',
    category: 'Support'
  },
  {
    question: 'Can you work with my existing team?',
    answer: 'Yes. The architect can integrate with an existing team, providing architectural leadership and augmenting capabilities to ensure the vision is executed to the highest standard.',
    category: 'General'
  },
];

export const CONTACT_INFO: ContactInfo[] = [
    {
        iconPath: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
        title: 'Email',
        value: 'membership.actuallydev@gmail.com',
        href: 'mailto:membership.actuallydev@gmail.com'
    },
    {
        iconPath: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52s-.67-.149-.67-.867c-.2-.718-.471-1.653-.471-1.653s-.273-.248-.57-.248c-.297 0-.471 0-.67.025s-.471.223-.718.471c-.248.248-.967.94-.967 2.312s.992 2.688 1.117 2.861c.125.174 1.758 2.688 4.267 3.75.597.248 1.096.398 1.48.52.597.174 1.145.148 1.57.099.471-.05 1.48-.606 1.699-1.181.223-.574.223-1.066.149-1.181-.074-.113-.248-.174-.52-.322z',
        title: 'WhatsApp',
        value: '+1 (585) 902-3061',
        href: 'https://wa.me/15859023061',
        description: 'whatsappHint'
    }
];