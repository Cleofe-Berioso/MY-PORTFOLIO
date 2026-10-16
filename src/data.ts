import type { Project, NavItem, SkillCategory, InterestItem } from './types';

export const INTRO_TEXT =
  "I'm a BSIS student at Carlos Hilado Memorial State University with a strong interest in programming, cybersecurity, and software engineering. I'm building my technical skills through practical projects and continuous learning.";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'Education', path: '/education' },
  { label: 'Contact', path: '/contact' },
];

export const PREVIEW_SKILLS: string[] = [
  'HTML',
  'CSS',
  'JavaScript',
  'Python',
  'PHP',
  'Next.js',
  'SQL',
  'Networking',
];

export const PROJECTS: Project[] = [
  {
    key: 'permit',
    title: 'Online Business Permit',
    category: 'Web Application',
    description:
      'A web-based business permit system project focused on digital access to business permitting services.',
    href: 'https://bpos.site/',
    route: '/projects/online-business-permit',
    technology: ['Next.js'],
    accent: 'permit',
    purpose:
      'The project explores how a web application can make business permitting services available through a digital interface.',
    role: 'Specific responsibilities and individual contributions have not yet been confirmed. This section is ready to be updated with an accurate account of the work.',
    process:
      'The detailed development process has not yet been documented. Confirmed planning, design, and implementation steps can be added here.',
    lessons:
      'Specific challenges and lessons learned have not yet been confirmed. This section remains intentionally unpublished rather than presenting unverified details.',
  },
  {
    key: 'rescue',
    title: 'Rescue Link',
    category: 'Web Application',
    description:
      'A project exploring an emergency-response dashboard and its digital user experience.',
    href: 'https://rescuelink-frontend.vercel.app',
    route: '/projects/rescue-link',
    technology: [],
    accent: 'rescue',
    purpose:
      'The project explores the structure and user experience of a digital emergency-response dashboard.',
    role: 'Specific responsibilities and individual contributions have not yet been confirmed. This section is ready to be updated with an accurate account of the work.',
    process:
      'The detailed development process has not yet been documented. Confirmed planning, design, and implementation steps can be added here.',
    lessons:
      'Specific challenges and lessons learned have not yet been confirmed. This section remains intentionally unpublished rather than presenting unverified details.',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Development',
    icon: 'code',
    body: 'Core technologies for creating structured, styled, and interactive web interfaces.',
    items: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Frameworks and Web Development',
    icon: 'web',
    body: 'Tools and technologies I am exploring for modern web application development.',
    items: ['Next.js', 'PHP'],
  },
  {
    title: 'Programming and Databases',
    icon: 'database',
    body: 'Foundational programming and data skills developed through study and practice.',
    items: ['Python', 'SQL'],
  },
  {
    title: 'Networking',
    icon: 'network',
    body: 'An evolving understanding of how computers, systems, and services communicate.',
    items: ['Networking fundamentals'],
  },
];

export const INTEREST_ITEMS: InterestItem[] = [
  {
    icon: 'code',
    number: '01',
    title: 'Software Development',
    body: 'Building useful interfaces and learning how applications move from an idea to working software.',
  },
  {
    icon: 'security',
    number: '02',
    title: 'Cybersecurity',
    body: 'Understanding secure systems, responsible practices, and the role security plays in modern technology.',
  },
  {
    icon: 'web',
    number: '03',
    title: 'Software Engineering',
    body: 'Exploring maintainable systems, collaborative development, and thoughtful technical problem-solving.',
  },
];
