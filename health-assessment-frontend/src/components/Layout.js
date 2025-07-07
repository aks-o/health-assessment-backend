import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import VoiceAssistant from './VoiceAssistant';
import './Layout.css';

function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // Scrolls to top of page on route change
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="layout">
      <Header />
      <main className={`main-content ${isHomePage ? 'main-content--home' : ''}`}>
        {children}
      </main>
      <Footer />
      <VoiceAssistant />
    </div>
  );
}

export default Layout;