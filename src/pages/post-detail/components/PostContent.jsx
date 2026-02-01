import React from 'react';
import Image from '../../../components/AppImage';

const PostContent = ({ content, featuredImage, featuredImageAlt }) => {
  const renderContent = () => {
    return content?.split('\n')?.map((paragraph, index) => {
      if (paragraph?.trim() === '') return null;
      
      if (paragraph?.startsWith('##')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-heading font-semibold text-foreground mt-8 mb-4">
            {paragraph?.replace('##', '')?.trim()}
          </h2>
        );
      }
      
      if (paragraph?.startsWith('#')) {
        return (
          <h3 key={index} className="text-xl md:text-2xl font-heading font-semibold text-foreground mt-6 mb-3">
            {paragraph?.replace('#', '')?.trim()}
          </h3>
        );
      }
      
      return (
        <p key={index} className="text-base md:text-lg text-foreground leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <article className="prose prose-lg max-w-none">
      {featuredImage && (
        <div className="mb-8 md:mb-10 rounded-lg overflow-hidden">
          <Image
            src={featuredImage}
            alt={featuredImageAlt}
            className="w-full h-64 md:h-96 lg:h-[500px] object-cover"
          />
        </div>
      )}

      <div className="space-y-4 content-measure">
        {renderContent()}
      </div>
    </article>
  );
};

export default PostContent;