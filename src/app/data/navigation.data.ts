import { NavLink, MegaMenuLink } from '../models';

export const NAV_LINKS: NavLink[] = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/work' },
    { label: 'Insights', href: '/insights' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
];

export const MEGA_MENU_DATA: MegaMenuLink[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      {
        title: 'Our Capabilities',
        items: [
          { label: 'Web Applications', href: '/services#services', iconPath: 'M6.75 7.5l-3.75 3.75 3.75 3.75M17.25 7.5l-3.75 3.75 3.75 3.75' },
          { label: 'UI/UX Design', href: '/services#services', iconPath: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125' },
          { label: 'Mobile Apps', href: '/services#services', iconPath: 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3' },
          { label: 'Cloud Solutions', href: '/services#services', iconPath: 'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.5 4.5 0 002.25 15z' }
        ]
      }
    ]
  },
  { label: 'Work', href: '/work' },
  {
    label: 'About',
    href: '/about',
    children: [
      { title: 'Our Agency', items: [
        { label: 'Our Philosophy', href: '/about#philosophy', iconPath: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-3.741 0a9.094 9.094 0 013.741-.479 3 3 0 01-4.682-2.72m-3.741 0a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72M3.12 3.12a9.094 9.094 0 013.741-.479 3 3 0 014.682 2.72m0 0a9.094 9.094 0 003.741.479 3 3 0 004.682 2.72M3.12 3.12a9.094 9.094 0 00-3.741.479 3 3 0 004.682 2.72m0 0a9.094 9.094 0 01-3.741.479 3 3 0 01-4.682 2.72' },
        { label: 'Our Ethos', href: '/about#ethos', iconPath: 'M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V5.75A2.25 2.25 0 0018 3.5H6A2.25 2.25 0 003.75 5.75v12.25A2.25 2.25 0 006 20.25z' },
        { label: 'The Team', href: '/about#team', iconPath: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' }
      ]}
    ]
  },
  {
    label: 'Insights',
    href: '/insights',
    children: [
      { title: 'From the Agency', items: [
        { label: 'Blog', href: '/insights#insights', iconPath: 'M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z' },
        { label: 'Labs', href: '/insights#labs', iconPath: 'M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-2.474-1.73-1.254h2.338l.99-2.261.99 2.261h2.338l-1.73 1.254.569 2.474-2.51-2.225z' }
      ]}
    ]
  },
  { label: 'Careers', href: '/careers' },
];