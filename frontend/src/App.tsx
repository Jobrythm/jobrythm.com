import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DomainProvider } from './contexts/DomainContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SecurityPage from './pages/SecurityPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminPage from './pages/admin/AdminPage';
import { usePageTracking } from './hooks/usePageTracking';
import { useDomain } from './contexts/DomainContext';

function AnalyticsTracker() {
  usePageTracking();
  return null;
}

function BookDemoRedirect() {
  const { demoUrl } = useDomain();
  // Guard against non-http(s) protocols even though DomainContext sanitizes demoUrl.
  const safe = /^https?:\/\//i.test(demoUrl) || demoUrl.startsWith('/');
  if (safe) {
    window.location.replace(demoUrl);
  }
  return null;
}

function App() {
  return (
    <DomainProvider>
      <Router>
        <AnalyticsTracker />
        <Routes>
          <Route path="/admin-page/*" element={<AdminPage />} />
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/book-demo" element={<BookDemoRedirect />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </DomainProvider>
  );
}

export default App;
