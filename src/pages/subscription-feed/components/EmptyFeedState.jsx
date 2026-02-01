import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyFeedState = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-xl border border-border shadow-warm p-8 md:p-12 lg:p-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Icon name="Inbox" size={40} color="var(--color-primary)" />
        </div>

        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-3">
          Your Feed is Empty
        </h2>

        <p className="text-base md:text-lg text-muted-foreground mb-6">
          Start following authors to see their latest posts in your personalized feed. Discover writers who share your interests and never miss their content.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="default"
            size="lg"
            iconName="Search"
            iconPosition="left"
          >
            Discover Authors
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/post-creation')}
            iconName="PenTool"
            iconPosition="left"
          >
            Write Your First Post
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm font-caption text-muted-foreground mb-4">
            Popular topics to explore:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Technology', 'Design', 'Writing', 'Business', 'Lifestyle', 'Travel']?.map((topic) => (
              <button
                key={topic}
                className="px-4 py-2 bg-muted hover:bg-primary/10 text-foreground hover:text-primary rounded-md text-sm font-caption font-medium transition-editorial"
              >
                #{topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyFeedState;