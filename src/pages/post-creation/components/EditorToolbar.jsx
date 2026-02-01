import React from 'react';
import Icon from '../../../components/AppIcon';

const EditorToolbar = ({ onFormat, activeFormats = [] }) => {
  const toolbarButtons = [
    { id: 'bold', icon: 'Bold', label: 'Bold' },
    { id: 'italic', icon: 'Italic', label: 'Italic' },
    { id: 'underline', icon: 'Underline', label: 'Underline' },
    { id: 'strikethrough', icon: 'Strikethrough', label: 'Strikethrough' },
    { id: 'divider1', type: 'divider' },
    { id: 'heading1', icon: 'Heading1', label: 'Heading 1' },
    { id: 'heading2', icon: 'Heading2', label: 'Heading 2' },
    { id: 'heading3', icon: 'Heading3', label: 'Heading 3' },
    { id: 'divider2', type: 'divider' },
    { id: 'list', icon: 'List', label: 'Bullet List' },
    { id: 'listOrdered', icon: 'ListOrdered', label: 'Numbered List' },
    { id: 'divider3', type: 'divider' },
    { id: 'link', icon: 'Link', label: 'Insert Link' },
    { id: 'image', icon: 'Image', label: 'Insert Image' },
    { id: 'quote', icon: 'Quote', label: 'Block Quote' },
    { id: 'code', icon: 'Code', label: 'Code Block' }
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 p-3 bg-muted/30 border-b border-border">
      {toolbarButtons?.map((button) => {
        if (button?.type === 'divider') {
          return (
            <div
              key={button?.id}
              className="w-px h-6 bg-border mx-1"
              aria-hidden="true"
            />
          );
        }

        const isActive = activeFormats?.includes(button?.id);

        return (
          <button
            key={button?.id}
            onClick={() => onFormat(button?.id)}
            className={`p-2 rounded-md transition-editorial hover:bg-muted ${
              isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
            }`}
            aria-label={button?.label}
            title={button?.label}
            type="button"
          >
            <Icon name={button?.icon} size={18} />
          </button>
        );
      })}
    </div>
  );
};

export default EditorToolbar;