import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const PostHeader = ({ post, onSubscribe, isSubscribed }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {post?.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-caption font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-foreground leading-tight">
          {post?.title}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {post?.excerpt}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <Image
            src={post?.author?.avatar}
            alt={post?.author?.avatarAlt}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
          />
          <div>
            <h3 className="font-caption font-semibold text-foreground">
              {post?.author?.name}
            </h3>
            <div className="flex items-center space-x-3 text-sm font-caption text-muted-foreground">
              <span>{formatDate(post?.publishedAt)}</span>
              <span>•</span>
              <span className="data-text">{post?.readTime} read</span>
            </div>
          </div>
        </div>

        {!isSubscribed && (
          <button
            onClick={onSubscribe}
            className="flex items-center justify-center space-x-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-editorial font-caption font-medium"
          >
            <Icon name="UserPlus" size={18} color="var(--color-primary-foreground)" />
            <span>Subscribe</span>
          </button>
        )}
      </div>
      {post?.isPrivate && (
        <div className="flex items-start space-x-3 p-4 rounded-md bg-warning/10 border border-warning/20">
          <Icon name="Lock" size={20} color="var(--color-warning)" />
          <div className="flex-1">
            <h4 className="font-caption font-semibold text-foreground mb-1">
              Private Post
            </h4>
            <p className="text-sm font-caption text-muted-foreground">
              This content is only visible to subscribers and authorized users.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostHeader;