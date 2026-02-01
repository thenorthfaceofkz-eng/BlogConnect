import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const FilterBar = ({ 
  sortBy, 
  onSortChange, 
  selectedTag, 
  onTagChange, 
  availableTags,
  onRefresh 
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'trending', label: 'Trending' },
    { value: 'oldest', label: 'Oldest First' }
  ];

  const tagOptions = [
    { value: 'all', label: 'All Tags' },
    ...availableTags?.map(tag => ({ value: tag, label: `#${tag}` }))
  ];

  return (
    <div className="bg-card rounded-xl border border-border shadow-warm p-4 md:p-5 lg:p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon name="Filter" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
              Your Feed
            </h2>
            <p className="text-sm font-caption text-muted-foreground">
              Posts from your subscriptions
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-48">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              placeholder="Sort by"
            />
          </div>

          <div className="w-full sm:w-48">
            <Select
              options={tagOptions}
              value={selectedTag}
              onChange={onTagChange}
              placeholder="Filter by tag"
              searchable
            />
          </div>

          <button
            onClick={onRefresh}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-md transition-editorial"
            aria-label="Refresh feed"
          >
            <Icon name="RefreshCw" size={18} />
            <span className="font-caption text-sm font-medium">Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;