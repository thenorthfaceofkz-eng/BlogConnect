import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';


const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handlePostClick = () => {
    navigate(`/post-detail/${post?.id}`);
  };

  const handleAuthorClick = (e) => {
    e?.stopPropagation();
  };

  const handleLike = (e) => {
    e?.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleBookmark = (e) => {
    e?.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e) => {
    e?.stopPropagation();
  };

  const formatDate = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return postDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <article 
      className="bg-card rounded-xl border border-border shadow-warm hover:shadow-warm-md transition-editorial cursor-pointer overflow-hidden group"
      onClick={handlePostClick}
    >
      {post?.featuredImage && (
        <div className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden">
          <Image
            src={post?.featuredImage}
            alt={post?.featuredImageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-editorial duration-500"
          />
          {post?.isPrivate && (
            <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-md flex items-center space-x-1.5">
              <Icon name="Lock" size={14} color="var(--color-primary)" />
              <span className="text-xs font-caption font-medium text-primary">Private</span>
            </div>
          )}
        </div>
      )}
      <div className="p-4 md:p-5 lg:p-6">
        <div className="flex items-center space-x-3 mb-3">
          <button 
            onClick={handleAuthorClick}
            className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-border hover:ring-primary transition-editorial"
          >
            <Image
              src={post?.authorAvatar}
              alt={post?.authorAvatarAlt}
              className="w-full h-full object-cover"
            />
          </button>
          <div className="flex-1 min-w-0">
            <button 
              onClick={handleAuthorClick}
              className="font-caption text-sm md:text-base font-medium text-foreground hover:text-primary transition-editorial block truncate"
            >
              {post?.authorName}
            </button>
            <div className="flex items-center space-x-2 text-xs md:text-sm font-caption text-muted-foreground">
              <span className="data-text">{formatDate(post?.publishedDate)}</span>
              <span>•</span>
              <span className="data-text">{post?.readTime}</span>
            </div>
          </div>
        </div>

        <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2 md:mb-3 line-clamp-2 group-hover:text-primary transition-editorial">
          {post?.title}
        </h2>

        <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 line-clamp-3">
          {post?.excerpt}
        </p>

        {post?.tags && post?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post?.tags?.slice(0, 3)?.map((tag, index) => (
              <button
                key={index}
                onClick={(e) => e?.stopPropagation()}
                className="px-3 py-1 bg-primary/10 text-primary rounded-md text-xs md:text-sm font-caption font-medium hover:bg-primary/20 transition-editorial"
              >
                #{tag}
              </button>
            ))}
            {post?.tags?.length > 3 && (
              <span className="px-3 py-1 text-muted-foreground text-xs md:text-sm font-caption">
                +{post?.tags?.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1.5 transition-editorial ${
                isLiked ? 'text-error' : 'text-muted-foreground hover:text-error'
              }`}
            >
              <Icon name={isLiked ? 'Heart' : 'Heart'} size={18} fill={isLiked ? 'currentColor' : 'none'} />
              <span className="text-sm font-caption data-text">{post?.likes}</span>
            </button>

            <button
              onClick={(e) => e?.stopPropagation()}
              className="flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-editorial"
            >
              <Icon name="MessageCircle" size={18} />
              <span className="text-sm font-caption data-text">{post?.comments}</span>
            </button>

            <div className="flex items-center space-x-1.5 text-muted-foreground">
              <Icon name="Eye" size={18} />
              <span className="text-sm font-caption data-text">{post?.views}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-md transition-editorial ${
                isBookmarked ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-muted'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <Icon name={isBookmarked ? 'BookmarkCheck' : 'Bookmark'} size={18} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-md text-muted-foreground hover:bg-muted transition-editorial"
              aria-label="Share post"
            >
              <Icon name="Share2" size={18} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;