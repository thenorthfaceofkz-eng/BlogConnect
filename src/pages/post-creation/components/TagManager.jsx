import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const TagManager = ({ selectedTags = [], onTagsChange }) => {
  const [tagInput, setTagInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestedTags = [
    "Technology", "Programming", "Web Development", "React", "JavaScript",
    "Design", "UI/UX", "Productivity", "Career", "Tutorial",
    "Opinion", "News", "Review", "Guide", "Best Practices",
    "Machine Learning", "AI", "Data Science", "DevOps", "Cloud Computing"
  ];

  const filteredSuggestions = suggestedTags?.filter(
    tag => 
      tag?.toLowerCase()?.includes(tagInput?.toLowerCase()) &&
      !selectedTags?.includes(tag)
  );

  const handleAddTag = (tag) => {
    if (tag && !selectedTags?.includes(tag) && selectedTags?.length < 10) {
      onTagsChange([...selectedTags, tag]);
      setTagInput('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onTagsChange(selectedTags?.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Enter' && tagInput?.trim()) {
      e?.preventDefault();
      handleAddTag(tagInput?.trim());
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-caption font-medium text-foreground">
          Tags
        </label>
        <span className="text-xs font-caption text-muted-foreground">
          {selectedTags?.length}/10
        </span>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Add tags..."
          value={tagInput}
          onChange={(e) => {
            setTagInput(e?.target?.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />

        {showSuggestions && filteredSuggestions?.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-card border border-border rounded-lg shadow-warm-lg max-h-48 overflow-y-auto">
            {filteredSuggestions?.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleAddTag(tag)}
                className="w-full px-4 py-2 text-left text-sm font-caption text-foreground hover:bg-muted transition-editorial"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
      {selectedTags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags?.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center space-x-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-caption"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-primary/80 transition-editorial"
                aria-label={`Remove ${tag} tag`}
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs font-caption text-muted-foreground">
        Tags help readers discover your content. Add up to 10 relevant tags.
      </p>
    </div>
  );
};

export default TagManager;