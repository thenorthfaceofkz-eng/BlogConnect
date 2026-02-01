import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AuthGate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location?.pathname === '/user-login';
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement?.classList?.add('dark');
    } else {
      document.documentElement?.classList?.remove('dark');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!isLoginPage) {
      if (!formData?.name) {
        newErrors.name = 'Name is required';
      }

      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/subscription-feed');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-card shadow-warm transition-editorial">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3 transition-editorial hover:opacity-80">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                <Icon name="BookOpen" size={24} color="var(--color-primary)" />
              </div>
              <span className="font-heading text-xl font-semibold text-foreground">BlogConnect</span>
            </Link>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-muted transition-editorial"
              aria-label="Toggle dark mode"
            >
              <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={20} color="var(--color-foreground)" />
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-xl shadow-warm-lg p-8 lg:p-10 border border-border">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-heading font-semibold text-foreground mb-2">
                {isLoginPage ? 'Welcome Back' : 'Join BlogConnect'}
              </h1>
              <p className="text-muted-foreground font-caption">
                {isLoginPage 
                  ? 'Sign in to continue your reading journey' :'Create an account to start sharing your stories'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLoginPage && (
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData?.name}
                  onChange={handleChange}
                  error={errors?.name}
                  required
                />
              )}

              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData?.email}
                onChange={handleChange}
                error={errors?.email}
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData?.password}
                onChange={handleChange}
                error={errors?.password}
                description={!isLoginPage ? "Must be at least 8 characters" : ""}
                required
              />

              {!isLoginPage && (
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData?.confirmPassword}
                  onChange={handleChange}
                  error={errors?.confirmPassword}
                  required
                />
              )}

              {isLoginPage && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                    <span className="font-caption text-muted-foreground">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="font-caption text-primary hover:text-primary/80 transition-editorial"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              <Button
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                loading={isLoading}
              >
                {isLoginPage ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm font-caption text-muted-foreground">
                {isLoginPage ? "Don't have an account? " : "Already have an account? "}
                <Link
                  to={isLoginPage ? '/user-registration' : '/user-login'}
                  className="text-primary hover:text-primary/80 font-medium transition-editorial"
                >
                  {isLoginPage ? 'Sign up' : 'Sign in'}
                </Link>
              </p>
            </div>

            {!isLoginPage && (
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs font-caption text-muted-foreground text-center">
                  By creating an account, you agree to our{' '}
                  <Link to="/terms" className="text-primary hover:text-primary/80">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthGate;