import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authPaths = ['/subscription-feed', '/post-creation', '/post-detail'];
    setIsAuthenticated(authPaths?.some(path => location?.pathname?.startsWith(path)));
  }, [location?.pathname]);

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

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/user-login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  if (!isAuthenticated) {
    return (
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-card shadow-warm transition-editorial">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3 transition-editorial hover:opacity-80">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                <Icon name="BookOpen" size={24} color="var(--color-primary)" />
              </div>
              <span className="font-heading text-xl font-semibold text-foreground">BlogConnect</span>
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md hover:bg-muted transition-editorial"
                aria-label="Toggle dark mode"
              >
                <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={20} color="var(--color-foreground)" />
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-card shadow-warm transition-editorial">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/subscription-feed" className="flex items-center space-x-3 transition-editorial hover:opacity-80">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                <Icon name="BookOpen" size={24} color="var(--color-primary)" />
              </div>
              <span className="font-heading text-xl font-semibold text-foreground">BlogConnect</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              <Link
                to="/subscription-feed"
                className={`px-4 py-2 rounded-md font-caption text-sm font-medium transition-editorial hover:bg-muted ${
                  isActivePath('/subscription-feed')
                    ? 'text-primary bg-primary/10' :'text-foreground'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Home" size={18} />
                  <span>Feed</span>
                </div>
              </Link>

              <Link
                to="/post-creation"
                className={`px-4 py-2 rounded-md font-caption text-sm font-medium transition-editorial hover:bg-muted ${
                  isActivePath('/post-creation')
                    ? 'text-primary bg-primary/10' :'text-foreground'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="PenTool" size={18} />
                  <span>Write</span>
                </div>
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md hover:bg-muted transition-editorial"
                aria-label="Toggle dark mode"
              >
                <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={20} color="var(--color-foreground)" />
              </button>

              <button
                className="p-2 rounded-md hover:bg-muted transition-editorial"
                aria-label="Notifications"
              >
                <Icon name="Bell" size={20} color="var(--color-foreground)" />
              </button>

              <button
                onClick={handleLogout}
                className="p-2 rounded-md hover:bg-muted transition-editorial"
                aria-label="Logout"
              >
                <Icon name="LogOut" size={20} color="var(--color-foreground)" />
              </button>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md hover:bg-muted transition-editorial"
              aria-label="Toggle menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} color="var(--color-foreground)" />
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[1100] md:hidden">
          <div className="fixed inset-0 bg-background" onClick={closeMobileMenu} />
          <nav className="fixed top-16 left-0 right-0 bg-card shadow-warm-lg animate-slide-down">
            <div className="px-6 py-4 space-y-2">
              <Link
                to="/subscription-feed"
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md font-caption text-base font-medium transition-editorial ${
                  isActivePath('/subscription-feed')
                    ? 'text-primary bg-primary/10' :'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name="Home" size={20} />
                <span>Feed</span>
              </Link>

              <Link
                to="/post-creation"
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md font-caption text-base font-medium transition-editorial ${
                  isActivePath('/post-creation')
                    ? 'text-primary bg-primary/10' :'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name="PenTool" size={20} />
                <span>Write</span>
              </Link>

              <div className="pt-4 mt-4 border-t border-border space-y-2">
                <button
                  onClick={() => {
                    toggleDarkMode();
                    closeMobileMenu();
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-md font-caption text-base font-medium text-foreground hover:bg-muted transition-editorial"
                >
                  <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={20} />
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                <button
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-md font-caption text-base font-medium text-foreground hover:bg-muted transition-editorial"
                >
                  <Icon name="Bell" size={20} />
                  <span>Notifications</span>
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-md font-caption text-base font-medium text-error hover:bg-error/10 transition-editorial"
                >
                  <Icon name="LogOut" size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}

      <Link
        to="/post-creation"
        className="md:hidden fixed bottom-6 right-6 z-[1000] w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-warm-lg flex items-center justify-center transition-editorial hover:scale-105 press-scale"
        aria-label="Write new post"
      >
        <Icon name="Plus" size={24} color="var(--color-primary-foreground)" />
      </Link>
    </>
  );
};

export default Header;