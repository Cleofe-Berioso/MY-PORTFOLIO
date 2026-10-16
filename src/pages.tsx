import React from 'react';
import {
  INTRO_TEXT,
  PROJECTS,
  PREVIEW_SKILLS,
  SKILL_CATEGORIES,
  INTEREST_ITEMS,
} from './data';
import profilePhoto from './assets/profile.jpg';
import {
  Button,
  Icon,
  Link,
  PageHero,
  ProjectCard,
  ProjectVisual,
  SectionHeading,
  SkillChip,
  ContactForm,
} from './components';

interface PageProps {
  navigate: (to: string) => void;
}

export function ContactCta({ navigate }: PageProps) {
  return (
    <section className="section cta-section">
      <div className="container">
        <div className="contact-cta">
          <div>
            <p className="eyebrow">Collaboration & Projects</p>
            <h2>Have a project or opportunity in mind?</h2>
            <p>I'd be happy to connect and learn more.</p>
          </div>
          <Button navigate={navigate} to="/contact">
            Contact Me
          </Button>
        </div>
      </div>
    </section>
  );
}

export function HomePage({ navigate }: PageProps) {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="status-dot" /> Bachelor of Science in Information Systems
            </div>
            <h1 className="hero-title">
              Hi, I'm Cleofe T. Berioso.
            </h1>
            <p className="hero-support">Building practical software, exploring security, and solving problems.</p>
            <p className="hero-intro">{INTRO_TEXT}</p>

            <div className="button-row">
              <Button navigate={navigate} to="/projects">
                Explore My Projects
              </Button>
              <Button navigate={navigate} to="/contact" variant="secondary">
                Get in Touch
              </Button>
            </div>

            <div className="hero-meta">
              <span>
                <i className="status-dot" /> Open to opportunities
              </span>
              <span>Carlos Hilado Memorial State University</span>
            </div>
          </div>

          <div className="portrait-wrap">
            <div className="portrait-card">
              <div className="portrait-image-container">
                <img
                  src={profilePhoto}
                  alt="Cleofe T. Berioso - Information Systems Student"
                  className="portrait-photo"
                />
              </div>
              <div className="portrait-caption">
                <strong>Cleofe T. Berioso</strong>
                <span>BSIS Student</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title-row">
            <SectionHeading
              body="Selected projects that reflect my current learning and interest in practical digital solutions."
              eyebrow="Selected Work"
              title="Featured projects"
            />
            <Link className="text-link desktop-only" navigate={navigate} to="/projects">
              See all projects <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="project-grid">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.key} navigate={navigate} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-section">
        <div className="container skills-preview-grid">
          <SectionHeading
            body="A growing technical foundation shaped by coursework, hands-on projects, and independent practice."
            eyebrow="Technical Toolkit"
            title="Skills I'm developing"
          />
          <div>
            <div className="skills-cloud">
              {PREVIEW_SKILLS.map((skill) => (
                <SkillChip key={skill}>{skill}</SkillChip>
              ))}
            </div>
            <Button navigate={navigate} to="/skills" variant="secondary">
              View All Skills
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-preview">
          <div className="about-preview-badge">
            <Icon name="code" size={28} />
          </div>
          <div>
            <p className="eyebrow">Focus & Direction</p>
            <h2>Curious about how technology can solve real problems.</h2>
          </div>
          <div className="about-preview-copy">
            <p>
              I'm focused on strengthening my understanding of information systems
              and learning how thoughtful software is planned, built, and improved.
            </p>
            <Button navigate={navigate} to="/about" variant="secondary">
              More About Me
            </Button>
          </div>
        </div>
      </section>

      <ContactCta navigate={navigate} />
    </>
  );
}

export function AboutPage({ navigate }: PageProps) {
  return (
    <>
      <PageHero
        body="A student, learner, and aspiring software engineer building a thoughtful foundation in technology."
        eyebrow="About Me"
        title="The person behind the projects."
      />

      <section className="section page-section">
        <div className="container profile-layout">
          <div className="profile-image-panel">
            <div className="profile-card">
              <img
                src={profilePhoto}
                alt="Cleofe T. Berioso"
                className="profile-photo"
              />
              <div className="profile-overlay-tag">
                <span className="profile-status-dot" />
                <span>BSIS Student</span>
              </div>
            </div>
            <div className="profile-fact">
              <Icon name="university" size={22} />
              <div>
                <span>Currently studying</span>
                <strong>Bachelor of Science in Information Systems</strong>
              </div>
            </div>
          </div>

          <div className="profile-content">
            <p className="eyebrow">Trajectory</p>
            <h2>Learning with purpose, one project at a time.</h2>
            <p>{INTRO_TEXT}</p>
            <p>
              My goal is to keep developing a practical understanding of how software
              and information systems can support people, organizations, and everyday
              processes. I value clear thinking, steady progress, and the opportunity to
              learn through hands-on work.
            </p>

            <dl className="profile-details">
              <div>
                <dt>Program</dt>
                <dd>Bachelor of Science in Information Systems</dd>
              </div>
              <div>
                <dt>University</dt>
                <dd>Carlos Hilado Memorial State University</dd>
              </div>
              <div>
                <dt>Career interests</dt>
                <dd>Programming, cybersecurity, and software engineering</dd>
              </div>
            </dl>

            <div className="button-row">
              <Button navigate={navigate} to="/projects">
                View My Projects
              </Button>
              <Button navigate={navigate} to="/contact" variant="secondary">
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section surface-section">
        <div className="container">
          <SectionHeading
            body="These are areas I am interested in exploring further as I continue my studies."
            eyebrow="Core Disciplines"
            title="What I want to learn more about"
          />
          <div className="interest-grid">
            {INTEREST_ITEMS.map((item) => (
              <article key={item.title} className="interest-card">
                <div className="interest-icon">
                  <Icon name={item.icon} size={24} />
                </div>
                <span className="interest-tag">Discipline</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function ProjectsPage({ navigate }: PageProps) {
  return (
    <>
      <PageHero
        body="A selection of web application projects created while building my technical skills and exploring practical digital experiences."
        eyebrow="Selected Work"
        title="Projects built through learning."
      />

      <section className="section page-section">
        <div className="container">
          <div className="project-grid">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.key} navigate={navigate} project={project} />
            ))}
          </div>
          <p className="projects-note">
            More work will be added as projects are completed and ready to share.
          </p>
        </div>
      </section>

      <ContactCta navigate={navigate} />
    </>
  );
}

interface CaseSectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
  placeholder?: boolean;
}

function CaseSection({
  number,
  title,
  children,
  placeholder = false,
}: CaseSectionProps) {
  return (
    <section className="case-section">
      <div className="case-section-heading">
        <span>{number}</span>
        <h2>{title}</h2>
      </div>
      <div className="case-section-body">
        {placeholder && (
          <span className="editable-label">Awaiting confirmed details</span>
        )}
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
    </section>
  );
}

interface ProjectDetailPageProps extends PageProps {
  projectKey: 'permit' | 'rescue';
}

export function ProjectDetailPage({
  navigate,
  projectKey,
}: ProjectDetailPageProps) {
  const project = PROJECTS.find((p) => p.key === projectKey);

  if (!project) {
    return null;
  }

  return (
    <>
      <section className="case-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link navigate={navigate} to="/">
              Home
            </Link>
            <span>/</span>
            <Link navigate={navigate} to="/projects">
              Projects
            </Link>
            <span>/</span>
            <span aria-current="page">{project.title}</span>
          </nav>

          <div className="case-title-grid">
            <div>
              <p className="eyebrow">{project.category}</p>
              <h1>{project.title}</h1>
            </div>
            <p className="case-summary">{project.description}</p>
          </div>

          <ProjectVisual large project={project} />
        </div>
      </section>

      <section className="section case-content">
        <div className="container case-layout">
          <aside className="case-aside">
            <div>
              <span>Project type</span>
              <strong>{project.category}</strong>
            </div>
            <div>
              <span>Technologies</span>
              <strong>
                {project.technology.length > 0
                  ? project.technology.join(', ')
                  : 'Not yet specified'}
              </strong>
            </div>
            <a
              className="button button-primary"
              href={project.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              Visit Live Project <Icon name="external" size={17} />
            </a>
          </aside>

          <div className="case-sections">
            <CaseSection number="01" title="Project purpose">
              {project.purpose}
            </CaseSection>

            <CaseSection number="02" placeholder title="My role and contribution">
              {project.role}
            </CaseSection>

            <CaseSection number="03" title="Technologies used">
              {project.technology.length > 0 ? (
                <div className="tag-row">
                  {project.technology.map((tech) => (
                    <SkillChip key={tech}>{tech}</SkillChip>
                  ))}
                </div>
              ) : (
                'The project technology stack has not yet been confirmed and is intentionally not listed.'
              )}
            </CaseSection>

            <CaseSection number="04" placeholder title="Development process">
              {project.process}
            </CaseSection>

            <CaseSection
              number="05"
              placeholder
              title="Challenges and lessons learned"
            >
              {project.lessons}
            </CaseSection>

            <Button navigate={navigate} to="/projects" variant="secondary">
              Back to Projects
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export function SkillsPage() {
  return (
    <>
      <PageHero
        body="A practical toolkit I am building through coursework, personal study, and hands-on projects."
        eyebrow="Technical Stack"
        title="Skills I'm developing."
      />

      <section className="section page-section">
        <div className="container skill-groups">
          {SKILL_CATEGORIES.map((category, index) => (
            <article key={category.title} className="skill-group">
              <span className="skill-group-index">0{index + 1}</span>
              <div className="skill-group-icon">
                <Icon name={category.icon} size={25} />
              </div>
              <div className="skill-group-copy">
                <h2>{category.title}</h2>
                <p>{category.body}</p>
              </div>
              <div className="skill-group-list">
                {category.items.map((item) => (
                  <SkillChip key={item}>{item}</SkillChip>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function EducationPage() {
  return (
    <>
      <PageHero
        body="My academic foundation in information systems, programming, and practical applications of technology."
        eyebrow="Academic Foundation"
        title="Learning the foundations."
      />

      <section className="section page-section">
        <div className="container education-layout">
          <article className="education-card">
            <div aria-hidden="true" className="education-logo">
              <Icon name="university" size={34} />
            </div>
            <div className="education-content">
              <p className="eyebrow">Undergraduate Program</p>
              <h2>Carlos Hilado Memorial State University</h2>
              <p className="education-program">
                Bachelor of Science in Information Systems <span>BSIS</span>
              </p>
              <div className="education-divider" />
              <div className="academic-focus">
                <span>Academic focus</span>
                <p>
                  Information systems, programming, and practical applications of
                  technology.
                </p>
              </div>
            </div>
          </article>

          <aside className="education-note">
            <span className="large-quote">“</span>
            <p>
              Building knowledge through academic study, practical projects, and
              continuous learning.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <PageHero
        body="Have a question, opportunity, or project in mind? I'd be glad to hear from you."
        eyebrow="Direct Line"
        title="Let's start a conversation."
      />

      <section className="section page-section">
        <div className="container contact-layout">
          <div className="contact-info">
            <p className="eyebrow">Communication</p>
            <h2>The best way to reach me.</h2>
            <p>
              Whether you're a teacher, recruiter, potential client, or fellow
              learner, feel free to send a message.
            </p>

            <a className="email-card" href="mailto:berioso.chmsu@gmail.com">
              <span className="email-icon">
                <Icon name="mail" size={23} />
              </span>
              <span>
                <small>Email me at</small>
                <strong>berioso.chmsu@gmail.com</strong>
              </span>
              <Icon name="arrow" size={20} />
            </a>

            <div className="availability">
              <i className="status-dot" />
              <span>Open to learning opportunities and project conversations</span>
            </div>
          </div>

          <div className="form-panel">
            <div className="form-heading">
              <h2>Send a message</h2>
              <p>All fields are required.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
