import React from 'react';
import Icon from '../../../components/AppIcon';

const AutoSaveIndicator = ({ status, lastSaved }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'saving':
        return {
          icon: 'Loader2',
          text: 'Saving...',
          color: 'text-warning',
          animate: 'animate-spin'
        };
      case 'saved':
        return {
          icon: 'CheckCircle2',
          text: 'All changes saved',
          color: 'text-success',
          animate: ''
        };
      case 'error':
        return {
          icon: 'AlertCircle',
          text: 'Failed to save',
          color: 'text-error',
          animate: ''
        };
      default:
        return {
          icon: 'Clock',
          text: 'Not saved',
          color: 'text-muted-foreground',
          animate: ''
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center space-x-2 px-3 py-1.5 bg-muted/50 rounded-md">
      <Icon 
        name={config?.icon} 
        size={14} 
        className={`${config?.color} ${config?.animate}`}
      />
      <span className={`text-xs font-caption ${config?.color}`}>
        {config?.text}
      </span>
      {lastSaved && status === 'saved' && (
        <span className="text-xs font-caption text-muted-foreground">
          • {new Date(lastSaved)?.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      )}
    </div>
  );
};

export default AutoSaveIndicator;