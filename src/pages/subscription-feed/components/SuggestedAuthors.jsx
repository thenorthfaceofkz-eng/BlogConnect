import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuggestedAuthors = ({ authors }) => {
  const navigate = useNavigate();
  const [followedAuthors, setFollowedAuthors] = React.useState(new Set());

  const handleFollow = (authorId, e) => {
    e?.stopPropagation();
    setFollowedAuthors(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(authorId)) {
        newSet?.delete(authorId);
      } else {
        newSet?.add(authorId);
      }
      return newSet;
    });
  };

  const handleAuthorClick = (authorId) => {
    // Navigate to author profile (not implemented in this scope)
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-warm p-4 md:p-5 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
          Suggested Authors
        </h3>
        <Icon name="Users" size={20} color="var(--color-primary)" />
      </div>
      <p className="text-sm font-caption text-muted-foreground mb-4">
        Discover writers based on your reading patterns
      </p>
      <div className="space-y-4">
        {authors?.map((author) => (
          <div
            key={author?.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-editorial cursor-pointer"
            onClick={() => handleAuthorClick(author?.id)}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden ring-2 ring-border">
              <Image
                src={author?.avatar}
                alt={author?.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-caption text-sm md:text-base font-medium text-foreground truncate">
                {author?.name}
              </h4>
              <p className="text-xs md:text-sm font-caption text-muted-foreground line-clamp-2 mb-2">
                {author?.bio}
              </p>
              <div className="flex items-center space-x-3 text-xs font-caption text-muted-foreground">
                <span className="data-text">{author?.followers} followers</span>
                <span>•</span>
                <span className="data-text">{author?.posts} posts</span>
              </div>
            </div>

            <Button
              variant={followedAuthors?.has(author?.id) ? 'outline' : 'default'}
              size="sm"
              onClick={(e) => handleFollow(author?.id, e)}
              iconName={followedAuthors?.has(author?.id) ? 'Check' : 'Plus'}
              iconPosition="left"
            >
              {followedAuthors?.has(author?.id) ? 'Following' : 'Follow'}
            </Button>
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        size="sm"
        fullWidth
        className="mt-4"
        iconName="ArrowRight"
        iconPosition="right"
      >
        View All Suggestions
      </Button>
    </div>
  );
};

export default SuggestedAuthors;