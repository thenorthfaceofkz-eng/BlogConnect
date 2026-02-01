import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ContentContext = ({ 
  type = 'detail',
  postData = null,
  onSave = null,
  onPublish = null,
  onShare = null,
  onBookmark = null,
  isBookmarked = false,
  isSaving = false,
  isPublishing = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location?.pathname?.includes('/post-detail')) {
      navigate('/subscription-feed');
    } else if (location?.pathname?.includes('/post-creation')) {
      navigate('/subscription-feed');
    } else {
      navigate(-1);
    }
  };

  if (type === 'creation') {
    return (
      <div className="sticky top-16 z-50 bg-card border-b border-border shadow-warm transition-editorial">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-editorial"
            >
              <Icon name="ArrowLeft" size={20} />
              <span className="font-caption text-sm font-medium">Back to Feed</span>
            </button>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="default"
                onClick={onSave}
                loading={isSaving}
                disabled={isPublishing}
                iconName="Save"
                iconPosition="left"
              >
                Save Draft
              </Button>

              <Button
                variant="default"
                size="default"
                onClick={onPublish}
                loading={isPublishing}
                disabled={isSaving}
                iconName="Send"
                iconPosition="left"
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="sticky top-16 z-50 bg-card border-b border-border shadow-warm transition-editorial">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-editorial"
            >
              <Icon name="ArrowLeft" size={20} />
              <span className="font-caption text-sm font-medium">Back to Feed</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={onBookmark}
                className={`p-2 rounded-md transition-editorial hover:bg-muted ${
                  isBookmarked ? 'text-primary' : 'text-muted-foreground'
                }`}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                <Icon name={isBookmarked ? 'BookmarkCheck' : 'Bookmark'} size={20} />
              </button>

              <button
                onClick={onShare}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-editorial"
                aria-label="Share post"
              >
                <Icon name="Share2" size={20} />
              </button>

              <button
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-editorial"
                aria-label="More options"
              >
                <Icon name="MoreVertical" size={20} />
              </button>
            </div>
          </div>

          {postData && (
            <div className="mt-4 flex items-center space-x-6 text-sm font-caption text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Eye" size={16} />
                <span className="data-text">{postData?.views || 0} views</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Heart" size={16} />
                <span className="data-text">{postData?.likes || 0} likes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MessageCircle" size={16} />
                <span className="data-text">{postData?.comments || 0} comments</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <span className="data-text">{postData?.readTime || '5 min'} read</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default ContentContext;