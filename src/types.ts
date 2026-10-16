export interface Project {
  key: 'permit' | 'rescue';
  title: string;
  category: string;
  description: string;
  href: string;
  route: string;
  technology: string[];
  accent: string;
  purpose: string;
  role: string;
  process: string;
  lessons: string;
}

export type IconName =
  | 'arrow'
  | 'code'
  | 'database'
  | 'external'
  | 'mail'
  | 'menu'
  | 'network'
  | 'security'
  | 'university'
  | 'web'
  | 'x';

export interface NavItem {
  label: string;
  path: string;
}

export interface SkillCategory {
  title: string;
  icon: IconName;
  body: string;
  items: string[];
}

export interface InterestItem {
  icon: IconName;
  number: string;
  title: string;
  body: string;
}
