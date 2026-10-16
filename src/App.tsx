import { useState, useEffect } from 'react';
import { Header, Footer, NotFound } from './components';
import {
  HomePage,
  AboutPage,
  ProjectsPage,
  ProjectDetailPage,
  SkillsPage,
  EducationPage,
  ContactPage,
} from './pages';

function normalizePath(path: string): string {
  const normalized = path.replace(/\/+$/, '');
  return normalized || '/';
}

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePath(window.location.pathname)
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPath]);

  const navigate = (nextPath: string) => {
    const normalized = normalizePath(nextPath);
    if (normalized === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', normalized);
    setCurrentPath(normalized);
  };

  let pageContent: React.ReactNode;
  switch (currentPath) {
    case '/':
      pageContent = <HomePage navigate={navigate} />;
      break;
    case '/about':
      pageContent = <AboutPage navigate={navigate} />;
      break;
    case '/projects':
      pageContent = <ProjectsPage navigate={navigate} />;
      break;
    case '/projects/online-business-permit':
      pageContent = (
        <ProjectDetailPage navigate={navigate} projectKey="permit" />
      );
      break;
    case '/projects/rescue-link':
      pageContent = (
        <ProjectDetailPage navigate={navigate} projectKey="rescue" />
      );
      break;
    case '/skills':
      pageContent = <SkillsPage />;
      break;
    case '/education':
      pageContent = <EducationPage />;
      break;
    case '/contact':
      pageContent = <ContactPage />;
      break;
    default:
      pageContent = <NotFound navigate={navigate} />;
  }

  return (
    <div className="site-shell">
      <div className="video-bg-wrap" aria-hidden="true">
        <video
          className="video-bg"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/star-bg.mp4" type="video/mp4" />
          <source src="/Star%20scene%20-%20Free%20M.G%20Stock%20Footage.mp4" type="video/mp4" />
        </video>
        <div className="video-bg-overlay" />
      </div>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div key={currentPath + '-beam'} className="page-route-glow" aria-hidden="true" />
      <Header activePath={currentPath} navigate={navigate} />
      <main id="main-content" key={currentPath} className="page-transition">
        {pageContent}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

export default App;
