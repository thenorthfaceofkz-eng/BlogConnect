import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import RegistrationFooter from './components/RegistrationFooter';

const UserRegistration = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModePreference = document.documentElement?.classList?.contains('dark');
    setIsDarkMode(darkModePreference);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement?.classList?.add('dark');
    } else {
      document.documentElement?.classList?.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-card shadow-warm transition-editorial">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link to="/" className="flex items-center space-x-2 md:space-x-3 transition-editorial hover:opacity-80">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-primary/10 flex items-center justify-center">
                <Icon name="BookOpen" size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
              </div>
              <span className="font-heading text-lg md:text-xl font-semibold text-foreground">BlogConnect</span>
            </Link>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-muted transition-editorial"
              aria-label="Toggle dark mode"
            >
              <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={18} color="var(--color-foreground)" className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 md:px-6 py-20 md:py-24 lg:py-28">
        <div className="w-full max-w-md lg:max-w-lg">
          <div className="bg-card rounded-xl shadow-warm-lg p-6 md:p-8 lg:p-10 border border-border">
            <RegistrationHeader />
            
            <RegistrationForm />
            
            <SocialRegistration />
            
            <RegistrationFooter />
          </div>

          <div className="mt-6 lg:mt-8 text-center">
            <p className="text-xs lg:text-sm font-caption text-muted-foreground">
              Need help?{' '}
              <Link to="/support" className="text-primary hover:text-primary/80">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </main>
      <footer className="py-6 lg:py-8 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-xs lg:text-sm font-caption text-muted-foreground">
              &copy; {new Date()?.getFullYear()} BlogConnect. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 lg:space-x-6">
              <Link to="/about" className="text-xs lg:text-sm font-caption text-muted-foreground hover:text-foreground transition-editorial">
                About
              </Link>
              <Link to="/terms" className="text-xs lg:text-sm font-caption text-muted-foreground hover:text-foreground transition-editorial">
                Terms
              </Link>
              <Link to="/privacy" className="text-xs lg:text-sm font-caption text-muted-foreground hover:text-foreground transition-editorial">
                Privacy
              </Link>
              <Link to="/help" className="text-xs lg:text-sm font-caption text-muted-foreground hover:text-foreground transition-editorial">
                Help
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserRegistration;