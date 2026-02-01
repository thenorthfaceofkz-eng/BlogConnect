import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationFooter = () => {
  return (
    <div className="mt-6 lg:mt-8 space-y-4 lg:space-y-5">
      <div className="text-center">
        <p className="text-sm lg:text-base font-caption text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/user-login"
            className="text-primary hover:text-primary/80 font-medium transition-editorial"
          >
            Sign in instead
          </Link>
        </p>
      </div>

      <div className="pt-4 lg:pt-5 border-t border-border">
        <p className="text-xs lg:text-sm font-caption text-muted-foreground text-center leading-relaxed">
          By creating an account, you acknowledge that you have read and agree to our{' '}
          <Link to="/terms" className="text-primary hover:text-primary/80">
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-primary hover:text-primary/80">
            Privacy Policy
          </Link>
          . We are committed to protecting your data and respecting your privacy.
        </p>
      </div>
    </div>
  );
};

export default RegistrationFooter;