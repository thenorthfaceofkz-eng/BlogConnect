import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      {[1, 2, 3]?.map((item) => (
        <div
          key={item}
          className="bg-card rounded-xl border border-border shadow-warm overflow-hidden animate-pulse"
        >
          <div className="w-full h-48 md:h-56 lg:h-64 bg-muted" />
          
          <div className="p-4 md:p-5 lg:p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-32" />
                <div className="h-3 bg-muted rounded w-24" />
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="h-6 md:h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>

            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-muted rounded w-20" />
              <div className="h-6 bg-muted rounded w-24" />
              <div className="h-6 bg-muted rounded w-16" />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex space-x-4">
                <div className="h-5 bg-muted rounded w-12" />
                <div className="h-5 bg-muted rounded w-12" />
                <div className="h-5 bg-muted rounded w-12" />
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-muted rounded" />
                <div className="w-8 h-8 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;