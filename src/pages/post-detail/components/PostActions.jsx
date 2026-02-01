import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const PostActions = ({ post, onLike, onShare, isLiked }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleShare = (platform) => {
    onShare(platform);
    setShowShareMenu(false);
  };

  return (
    <div className="sticky bottom-0 bg-card border-t border-border py-4 md:py-6">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              onClick={onLike}
              className={`flex items-center space-x-2 transition-editorial ${
                isLiked ? 'text-error' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={isLiked ? 'Heart' : 'Heart'} size={24} fill={isLiked ? 'currentColor' : 'none'} />
              <span className="font-caption font-medium data-text">{post?.likes}</span>
            </button>

            <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-editorial">
              <Icon name="MessageCircle" size={24} />
              <span className="font-caption font-medium data-text">{post?.comments}</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-editorial"
              >
                <Icon name="Share2" size={24} />
                <span className="hidden sm:inline font-caption font-medium">Share</span>
              </button>

              {showShareMenu && (
                <div className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-md shadow-warm-lg p-2 min-w-[160px]">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-editorial text-left"
                  >
                    <Icon name="Twitter" size={18} />
                    <span className="font-caption text-sm">Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-editorial text-left"
                  >
                    <Icon name="Facebook" size={18} />
                    <span className="font-caption text-sm">Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-editorial text-left"
                  >
                    <Icon name="Linkedin" size={18} />
                    <span className="font-caption text-sm">LinkedIn</span>
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-editorial text-left"
                  >
                    <Icon name="Link" size={18} />
                    <span className="font-caption text-sm">Copy Link</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm font-caption text-muted-foreground">
            <Icon name="Eye" size={18} />
            <span className="data-text">{post?.views} views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostActions;