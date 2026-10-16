import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('Cleofe T. Berioso Portfolio', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('renders home page with correct hero and introductions', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      "Hi, I'm Cleofe T. Berioso."
    );
    expect(
      screen.getByText(/BSIS student at Carlos Hilado Memorial State University/i)
    ).toBeInTheDocument();
    expect(screen.getByText('Explore My Projects')).toBeInTheDocument();
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('navigates to About page and displays education & interest details', async () => {
    render(<App />);

    const aboutLinks = screen.getAllByRole('link', { name: /About Me/i });
    fireEvent.click(aboutLinks[0]);

    expect(
      await screen.findByRole('heading', { name: /The person behind the projects\./i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Carlos Hilado Memorial State University/i).length
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Software Development')).toBeInTheDocument();
    expect(screen.getByText('Cybersecurity')).toBeInTheDocument();
    expect(screen.getByText('Software Engineering')).toBeInTheDocument();
  });

  it('navigates to Projects page and shows both confirmed projects', async () => {
    render(<App />);

    const projectsLinks = screen.getAllByRole('link', { name: /^Projects$/i });
    fireEvent.click(projectsLinks[0]);

    expect(
      await screen.findByRole('heading', { name: /Projects built through learning\./i })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Online Business Permit')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Rescue Link')[0]).toBeInTheDocument();
  });

  it('navigates to Online Business Permit case study and verifies details', async () => {
    window.history.pushState({}, '', '/projects/online-business-permit');
    render(<App />);

    expect(
      await screen.findByRole('heading', { name: 'Online Business Permit' })
    ).toBeInTheDocument();
    expect(screen.getByText(/Project purpose/i)).toBeInTheDocument();
    expect(screen.getByText(/My role and contribution/i)).toBeInTheDocument();
    expect(screen.getByText(/Technologies used/i)).toBeInTheDocument();

    const liveBtn = screen.getByRole('link', { name: /Visit Live Project/i });
    expect(liveBtn).toHaveAttribute('href', 'https://bpos.site/');
    expect(liveBtn).toHaveAttribute('target', '_blank');
    expect(liveBtn).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('navigates to Rescue Link case study and verifies details', async () => {
    window.history.pushState({}, '', '/projects/rescue-link');
    render(<App />);

    expect(
      await screen.findByRole('heading', { name: 'Rescue Link' })
    ).toBeInTheDocument();

    const liveBtn = screen.getByRole('link', { name: /Visit Live Project/i });
    expect(liveBtn).toHaveAttribute(
      'href',
      'https://rescuelink-frontend.vercel.app'
    );
    expect(liveBtn).toHaveAttribute('target', '_blank');
    expect(liveBtn).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('navigates to Skills page and renders all 4 categories', async () => {
    window.history.pushState({}, '', '/skills');
    render(<App />);

    expect(
      await screen.findByRole('heading', { name: /Skills I'm developing\./i })
    ).toBeInTheDocument();
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
    expect(
      screen.getByText('Frameworks and Web Development')
    ).toBeInTheDocument();
    expect(screen.getByText('Programming and Databases')).toBeInTheDocument();
    expect(screen.getByText('Networking')).toBeInTheDocument();
  });

  it('navigates to Education page and renders Carlos Hilado Memorial State University', async () => {
    window.history.pushState({}, '', '/education');
    render(<App />);

    expect(
      await screen.findByRole('heading', {
        name: 'Carlos Hilado Memorial State University',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Bachelor of Science in Information Systems/i)
    ).toBeInTheDocument();
  });

  it('renders Contact page with working email link and handles form validation', async () => {
    window.history.pushState({}, '', '/contact');
    render(<App />);

    expect(
      await screen.findByRole('heading', { name: /The best way to reach me\./i })
    ).toBeInTheDocument();

    const emailCards = screen.getAllByRole('link', {
      name: /berioso\.chmsu@gmail\.com/i,
    });
    expect(emailCards[0]).toHaveAttribute('href', 'mailto:berioso.chmsu@gmail.com');

    // Submit empty form -> should display validation errors
    const submitBtn = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitBtn);

    expect(
      await screen.findByText('Please enter your full name.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please enter your email address.')
    ).toBeInTheDocument();
    expect(screen.getByText('Please enter a subject.')).toBeInTheDocument();
    expect(screen.getByText('Please enter your message.')).toBeInTheDocument();

    // Fill invalid email
    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const subjectInput = screen.getByLabelText(/Subject/i);
    const messageInput = screen.getByLabelText(/Message/i);

    fireEvent.change(nameInput, { target: { value: 'Test Recruiter' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(subjectInput, { target: { value: 'Internship Opportunity' } });
    fireEvent.change(messageInput, { target: { value: 'Hello Cleofe, loved your work.' } });

    fireEvent.click(submitBtn);
    expect(
      await screen.findByText('Please enter a valid email address.')
    ).toBeInTheDocument();

    // Fill valid email
    fireEvent.change(emailInput, { target: { value: 'recruiter@tech.org' } });
    fireEvent.click(submitBtn);

    // Should enter loading/checking state and show demo notice
    await waitFor(
      () => {
        expect(screen.getByText(/Demo form/i)).toBeInTheDocument();
        expect(
          screen.getByText(/delivery is not configured yet/i)
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Form values should remain preserved
    expect(nameInput).toHaveValue('Test Recruiter');
    expect(emailInput).toHaveValue('recruiter@tech.org');
    expect(subjectInput).toHaveValue('Internship Opportunity');
    expect(messageInput).toHaveValue('Hello Cleofe, loved your work.');
  });

  it('toggles mobile menu open and closes when link is clicked', async () => {
    render(<App />);

    const menuButton = screen.getByRole('button', {
      name: /open navigation menu/i,
    });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // Click menu button to open
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(document.body).toHaveClass('menu-open');

    // Click on a mobile nav link (e.g. Contact)
    const mobileMenu = document.getElementById('mobile-menu');
    expect(mobileMenu).toHaveClass('open');

    const contactMobileLink = mobileMenu?.querySelector('a[href="/contact"]');
    expect(contactMobileLink).toBeInTheDocument();
    fireEvent.click(contactMobileLink!);

    // Should close menu and navigate to Contact
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(document.body).not.toHaveClass('menu-open');
    expect(
      await screen.findByRole('heading', { name: /The best way to reach me\./i })
    ).toBeInTheDocument();
  });

  it('navigates back to Projects from a case study page', async () => {
    window.history.pushState({}, '', '/projects/rescue-link');
    render(<App />);

    const backButton = screen.getByRole('link', { name: /Back to Projects/i });
    fireEvent.click(backButton);

    expect(
      await screen.findByRole('heading', { name: /Projects built through learning\./i })
    ).toBeInTheDocument();
  });

  it('renders 404 page for unknown routes and allows returning home', async () => {
    window.history.pushState({}, '', '/random-unknown-route');
    render(<App />);

    expect(
      await screen.findByRole('heading', { name: "This page isn't available." })
    ).toBeInTheDocument();

    const returnBtn = screen.getByRole('link', { name: 'Return Home' });
    fireEvent.click(returnBtn);

    expect(
      await screen.findByRole('heading', { name: "Hi, I'm Cleofe T. Berioso." })
    ).toBeInTheDocument();
  });
});

