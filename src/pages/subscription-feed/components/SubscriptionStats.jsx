import React from 'react';
import Icon from '../../../components/AppIcon';

const SubscriptionStats = ({ stats }) => {
  const statItems = [
    {
      icon: 'Users',
      label: 'Subscriptions',
      value: stats?.subscriptions,
      color: 'var(--color-primary)'
    },
    {
      icon: 'FileText',
      label: 'Posts Read',
      value: stats?.postsRead,
      color: 'var(--color-secondary)'
    },
    {
      icon: 'Heart',
      label: 'Total Likes',
      value: stats?.totalLikes,
      color: 'var(--color-error)'
    },
    {
      icon: 'MessageCircle',
      label: 'Comments',
      value: stats?.comments,
      color: 'var(--color-accent)'
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border shadow-warm p-4 md:p-5 lg:p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
          <Icon name="BarChart3" size={20} color="var(--color-primary)" />
        </div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
          Your Activity
        </h3>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {statItems?.map((item, index) => (
          <div
            key={index}
            className="bg-muted rounded-lg p-3 md:p-4 hover:shadow-warm transition-editorial"
          >
            <div className="flex items-center justify-between mb-2">
              <Icon name={item?.icon} size={20} color={item?.color} />
            </div>
            <div className="text-2xl md:text-3xl font-heading font-semibold text-foreground data-text mb-1">
              {item?.value}
            </div>
            <div className="text-xs md:text-sm font-caption text-muted-foreground">
              {item?.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionStats;