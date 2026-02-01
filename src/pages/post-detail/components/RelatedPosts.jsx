import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RelatedPosts = ({ posts }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
        More from this author
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {posts?.map((post) => (
          <Link
            key={post?.id}
            to={`/post-detail?id=${post?.id}`}
            className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-warm-md transition-editorial"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <Image
                src={post?.image}
                alt={post?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-editorial"
              />
            </div>
            <div className="p-4 md:p-5">
              <div className="flex items-center space-x-2 mb-2">
                {post?.tags?.slice(0, 2)?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-caption font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-editorial">
                {post?.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {post?.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs font-caption text-muted-foreground">
                <span>{formatDate(post?.publishedAt)}</span>
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <Icon name="Eye" size={14} />
                    <span className="data-text">{post?.views}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Heart" size={14} />
                    <span className="data-text">{post?.likes}</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;