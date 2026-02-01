import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuthorCard = ({ author, onSubscribe, isSubscribed }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-warm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <Image
          src={author?.avatar}
          alt={author?.avatarAlt}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-1">
            {author?.name}
          </h3>
          <p className="text-sm font-caption text-muted-foreground">
            {author?.bio}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-6 mb-6 text-sm font-caption text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} />
          <span className="data-text">{author?.subscribers} subscribers</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={16} />
          <span className="data-text">{author?.posts} posts</span>
        </div>
      </div>
      {!isSubscribed && (
        <Button
          variant="default"
          fullWidth
          onClick={onSubscribe}
          iconName="UserPlus"
          iconPosition="left"
        >
          Subscribe to {author?.name?.split(' ')?.[0]}
        </Button>
      )}
      {isSubscribed && (
        <Button
          variant="outline"
          fullWidth
          iconName="Check"
          iconPosition="left"
        >
          Subscribed
        </Button>
      )}
    </div>
  );
};

export default AuthorCard;