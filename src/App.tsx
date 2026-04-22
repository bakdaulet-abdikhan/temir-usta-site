import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import { PrivacyPage, TermsPage } from './pages/Policy';
import { LanguageProvider } from './i18n/LanguageContext';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flexGrow: 1 }}>
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
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
