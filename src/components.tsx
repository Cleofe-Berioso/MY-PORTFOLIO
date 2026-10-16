import React, { useState, useEffect } from 'react';
import type { IconName, Project, NavItem } from './types';
import { NAV_ITEMS } from './data';
import profilePhoto from './assets/profile.jpg';

interface IconProps {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20 }: IconProps) {
  const icons: Record<IconName, React.ReactNode> = {
    arrow: <path d="m9 18 6-6-6-6" />,
    code: (
      <>
        <path d="m8 9-4 3 4 3" />
        <path d="m16 9 4 3-4 3" />
        <path d="m14 5-4 14" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
        <path d="M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" />
      </>
    ),
    external: (
      <>
        <path d="M15 4h5v5" />
        <path d="m20 4-9 9" />
        <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    network: (
      <>
        <circle cx="12" cy="5" r="2" />
        <circle cx="5" cy="18" r="2" />
        <circle cx="19" cy="18" r="2" />
        <path d="m11 7-5 9M13 7l5 9M7 18h10" />
      </>
    ),
    security: (
      <>
        <path d="M12 3 5 6v5c0 4.4 2.8 8.3 7 10 4.2-1.7 7-5.6 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    university: (
      <>
        <path d="m3 10 9-6 9 6" />
        <path d="M5 10h14M6 10v8m4-8v8m4-8v8m4-8v8M4 20h16" />
      </>
    ),
    web: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18" />
      </>
    ),
    x: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {icons[name]}
    </svg>
  );
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  navigate: (to: string) => void;
  children: React.ReactNode;
}

export function Link({
  children,
  className = '',
  navigate,
  to,
  onClick,
  ...rest
}: LinkProps) {
  return (
    <a
      className={className}
      href={to}
      onClick={(e) => {
        if (
          !e.defaultPrevented &&
          e.button === 0 &&
          !e.metaKey &&
          !e.ctrlKey &&
          !e.shiftKey &&
          !e.altKey
        ) {
          e.preventDefault();
          navigate(to);
          onClick?.(e);
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

interface HeaderProps {
  activePath: string;
  navigate: (path: string) => void;
}

export function Header({ activePath, navigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(activePath);

  if (prevPath !== activePath) {
    setPrevPath(activePath);
    setMenuOpen(false);
  }

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const isLinkActive = (path: string) =>
    path === '/projects' ? activePath.startsWith('/projects') : activePath === path;

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link
          className="wordmark"
          navigate={navigate}
          to="/"
          aria-label="CTB home"
        >
          <img src={profilePhoto} alt="" className="nav-avatar" />
          <span>CTB<span>.</span></span>
        </Link>

        <nav aria-label="Primary navigation" className="desktop-nav">
          {NAV_ITEMS.map((item: NavItem) => (
            <Link
              key={item.path}
              className={`nav-link ${isLinkActive(item.path) ? 'active' : ''}`}
              navigate={navigate}
              to={item.path}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          className="button button-primary nav-cta"
          navigate={navigate}
          to="/contact"
        >
          Let's Talk
        </Link>

        <button
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="menu-button"
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
        >
          <Icon name={menuOpen ? 'x' : 'menu'} size={24} />
        </button>
      </div>

      <div
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        id="mobile-menu"
      >
        <nav aria-label="Mobile navigation" className="container mobile-menu-inner">
          {NAV_ITEMS.map((item: NavItem) => (
            <Link
              key={item.path}
              className={`mobile-nav-link ${isLinkActive(item.path) ? 'active' : ''}`}
              navigate={navigate}
              onClick={() => setMenuOpen(false)}
              to={item.path}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="button button-primary"
            navigate={navigate}
            onClick={() => setMenuOpen(false)}
            to="/contact"
          >
            Let's Talk
          </Link>
        </nav>
      </div>
    </header>
  );
}

interface FooterProps {
  navigate: (path: string) => void;
}

const CURRENT_YEAR = new Date().getFullYear();

export function Footer({ navigate }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div>
          <Link className="wordmark" navigate={navigate} to="/">
            <img src={profilePhoto} alt="" className="nav-avatar" />
            <span>CTB<span>.</span></span>
          </Link>
          <p className="footer-summary">
            A BSIS student exploring thoughtful, practical technology.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="footer-links">
          {NAV_ITEMS.slice(1).map((item: NavItem) => (
            <Link key={item.path} navigate={navigate} to={item.path}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="container footer-bottom">
        <p>© {CURRENT_YEAR} Cleofe T. Berioso.</p>
        <a href="mailto:berioso.chmsu@gmail.com">berioso.chmsu@gmail.com</a>
      </div>
    </footer>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  navigate: (to: string) => void;
  to: string;
  variant?: 'primary' | 'secondary';
}

export function Button({
  children,
  navigate,
  to,
  variant = 'primary',
}: ButtonProps) {
  return (
    <Link className={`button button-${variant}`} navigate={navigate} to={to}>
      {children}
      {variant === 'primary' && <Icon name="arrow" size={17} />}
    </Link>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${align === 'center' ? 'centered' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

interface ProjectVisualProps {
  project: Project;
  large?: boolean;
}

export function ProjectVisual({ project, large = false }: ProjectVisualProps) {
  let hostname = '';
  try {
    hostname = new URL(project.href).hostname;
  } catch {
    hostname = project.href;
  }

  return (
    <div
      aria-label={`${project.title} replaceable project screenshot placeholder`}
      className={`project-visual ${project.accent} ${large ? 'large' : ''}`}
      role="img"
    >
      <div className="browser-chrome">
        <span />
        <span />
        <span />
        <div className="browser-address">{hostname}</div>
      </div>
      <div className="mock-interface">
        <div className="mock-sidebar">
          <b>{project.key === 'permit' ? 'BP' : 'RL'}</b>
          <span />
          <span />
          <span />
        </div>
        <div className="mock-main">
          <span className="mock-kicker" />
          <strong>{project.title}</strong>
          <div className="mock-cards">
            <span />
            <span />
            <span />
          </div>
          <div className="mock-line" />
          <div className="mock-line short" />
        </div>
      </div>
      <span className="replace-note">Screenshot placeholder</span>
    </div>
  );
}

export function SkillChip({ children }: { children: React.ReactNode }) {
  return <span className="skill-chip">{children}</span>;
}

interface ProjectCardProps {
  project: Project;
  navigate: (to: string) => void;
}

export function ProjectCard({ project, navigate }: ProjectCardProps) {
  return (
    <article className="project-card">
      <ProjectVisual project={project} />
      <div className="project-card-content">
        <p className="project-category">{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.technology.length > 0 && (
          <div className="tag-row" aria-label="Technologies used">
            {project.technology.map((tech) => (
              <SkillChip key={tech}>{tech}</SkillChip>
            ))}
          </div>
        )}
        <div className="project-actions">
          <Button navigate={navigate} to={project.route}>
            View Case Study
          </Button>
          <a
            className="text-link"
            href={project.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            Visit Website <Icon name="external" size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  body: string;
}

export function PageHero({ eyebrow, title, body }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-lead">{body}</p>
      </div>
    </section>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  value: string;
  onChange: (val: string) => void;
  type?: 'text' | 'email';
  placeholder?: string;
}

export function FormField({
  id,
  label,
  error,
  value,
  onChange,
  type = 'text',
  placeholder,
}: FormFieldProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        id={id}
        name={id}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        type={type}
        value={value}
      />
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState('');

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setNotice('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    }

    setErrors(newErrors);
    setNotice('');

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      window.setTimeout(() => {
        setIsSubmitting(false);
        setNotice(
          'Your message is ready, but delivery is not configured yet. Please email Cleofe directly using the address on this page.'
        );
      }, 650);
    }
  };

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="form-row">
        <FormField
          error={errors.name}
          id="name"
          label="Full Name"
          onChange={(val) => updateField('name', val)}
          placeholder="Your full name"
          value={formData.name}
        />
        <FormField
          error={errors.email}
          id="email"
          label="Email Address"
          onChange={(val) => updateField('email', val)}
          placeholder="you@example.com"
          type="email"
          value={formData.email}
        />
      </div>

      <FormField
        error={errors.subject}
        id="subject"
        label="Subject"
        onChange={(val) => updateField('subject', val)}
        placeholder="What would you like to discuss?"
        value={formData.subject}
      />

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={Boolean(errors.message)}
          id="message"
          name="message"
          onChange={(e) => updateField('message', e.target.value)}
          placeholder="Tell me a little about your message..."
          required
          rows={6}
          value={formData.message}
        />
        {errors.message && (
          <p className="field-error" id="message-error">
            {errors.message}
          </p>
        )}
      </div>

      {notice && (
        <div className="form-notice" role="status">
          <strong>Demo form</strong>
          <span>{notice}</span>
        </div>
      )}

      <button
        className="button button-primary submit-button"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Checking message...' : 'Send Message'}
        {!isSubmitting && <Icon name="arrow" size={17} />}
      </button>
    </form>
  );
}

export function NotFound({ navigate }: { navigate: (to: string) => void }) {
  return (
    <section className="not-found container">
      <p className="eyebrow">404 · PAGE NOT FOUND</p>
      <h1>This page isn't available.</h1>
      <p>The page may have moved, or the address may be incorrect.</p>
      <Button navigate={navigate} to="/">
        Return Home
      </Button>
    </section>
  );
}
