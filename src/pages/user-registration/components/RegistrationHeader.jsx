import React from 'react';

import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center mb-6 lg:mb-8">
      <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-primary/10 mb-4 lg:mb-5">
        <Icon name="UserPlus" size={28} color="var(--color-primary)" className="lg:w-8 lg:h-8" />
      </div>
      
      <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2 lg:mb-3">
        Join BlogConnect
      </h1>
      
      <p className="text-sm lg:text-base text-muted-foreground font-caption max-w-md mx-auto">
        Create your account to start sharing your stories and connecting with writers from around the world
      </p>
    </div>
  );
};

export default RegistrationHeader;