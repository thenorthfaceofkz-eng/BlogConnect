import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PublishingControls = ({
  privacy,
  onPrivacyChange,
  scheduleDate,
  onScheduleDateChange,
  onSaveDraft,
  onPreview,
  onPublish,
  isSaving,
  isPublishing,
  lastSaved
}) => {
  const privacyOptions = [
    { 
      value: 'public', 
      label: 'Public',
      description: 'Anyone can view this post'
    },
    { 
      value: 'private', 
      label: 'Private',
      description: 'Only approved readers can view'
    }
  ];

  const formatLastSaved = (timestamp) => {
    if (!timestamp) return 'Not saved yet';
    
    const now = new Date();
    const saved = new Date(timestamp);
    const diffMs = now - saved;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return saved?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Publishing Settings
        </h3>

        <Select
          label="Privacy"
          description="Control who can view your post"
          options={privacyOptions}
          value={privacy}
          onChange={onPrivacyChange}
        />

        <div className="space-y-2">
          <label className="text-sm font-caption font-medium text-foreground">
            Schedule Publication
          </label>
          <input
            type="datetime-local"
            value={scheduleDate}
            onChange={(e) => onScheduleDateChange(e?.target?.value)}
            min={new Date()?.toISOString()?.slice(0, 16)}
            className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm font-caption text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-editorial"
          />
          <p className="text-xs font-caption text-muted-foreground">
            Leave empty to publish immediately
          </p>
        </div>

        {lastSaved && (
          <div className="flex items-center space-x-2 text-xs font-caption text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>Last saved: {formatLastSaved(lastSaved)}</span>
          </div>
        )}
      </div>
      <div className="pt-6 border-t border-border space-y-3">
        <Button
          variant="outline"
          size="default"
          fullWidth
          onClick={onSaveDraft}
          loading={isSaving}
          disabled={isPublishing}
          iconName="Save"
          iconPosition="left"
        >
          Save Draft
        </Button>

        <Button
          variant="secondary"
          size="default"
          fullWidth
          onClick={onPreview}
          disabled={isSaving || isPublishing}
          iconName="Eye"
          iconPosition="left"
        >
          Preview
        </Button>

        <Button
          variant="default"
          size="default"
          fullWidth
          onClick={onPublish}
          loading={isPublishing}
          disabled={isSaving}
          iconName="Send"
          iconPosition="left"
        >
          {scheduleDate ? 'Schedule Post' : 'Publish Now'}
        </Button>
      </div>
      <div className="pt-4 border-t border-border">
        <div className="flex items-start space-x-2 text-xs font-caption text-muted-foreground">
          <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
          <p>
            {privacy === 'private' ?'Private posts require readers to request access before viewing.' :'Public posts are visible to all readers and can be discovered through search.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublishingControls;