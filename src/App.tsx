import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import CTA from './pages/CTA';
import { PrivacyPage, TermsPage } from './pages/Policy';
import { LanguageProvider } from './i18n/LanguageContext';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flexGrow: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <Routes>
          {/* Standalone ad page — no header/footer */}
          <Route path="/cta" element={<CTA />} />

          {/* All other pages with header/footer */}
          <Route path="/*" element={
            <MainLayout>
              <Routes>
                {/* Kazakh (default) */}
                <Route path="/" element={<Home />} />
                <Route path="/catalog/:tier" element={<Category />} />
                {/* Russian */}
                <Route path="/ru" element={<Home />} />
                <Route path="/ru/catalog/:tier" element={<Category />} />
                {/* Ads pages — hidden, separate WhatsApp number */}
                <Route path="/catalog/ads/:tier" element={<Category whatsappNumber="77273122530" />} />
                <Route path="/ru/catalog/ads/:tier" element={<Category whatsappNumber="77273122530" />} />
                {/* Policy pages */}
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/ru/privacy" element={<PrivacyPage />} />
                <Route path="/ru/terms" element={<TermsPage />} />
              </Routes>
            </MainLayout>
          } />
        </Routes>
      </LanguageProvider>
    </Router>
  );
}

export default App;
