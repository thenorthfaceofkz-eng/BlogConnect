import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ContentContext from '../../components/ui/ContentContext';
import Input from '../../components/ui/Input';
import EditorToolbar from './components/EditorToolbar';
import TagManager from './components/TagManager';
import MediaUploader from './components/MediaUploader';
import PublishingControls from './components/PublishingControls';
import AutoSaveIndicator from './components/AutoSaveIndicator';

const PostCreation = () => {
  const navigate = useNavigate();
  
  const [postData, setPostData] = useState({
    title: '',
    subtitle: '',
    content: '',
    tags: [],
    privacy: 'public',
    scheduleDate: '',
    uploadedImages: []
  });

  const [activeFormats, setActiveFormats] = useState([]);
  const [autoSaveStatus, setAutoSaveStatus] = useState('idle');
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [charCounts, setCharCounts] = useState({
    title: 0,
    subtitle: 0,
    content: 0
  });

  useEffect(() => {
    setCharCounts({
      title: postData?.title?.length,
      subtitle: postData?.subtitle?.length,
      content: postData?.content?.length
    });
  }, [postData?.title, postData?.subtitle, postData?.content]);

  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (postData?.title || postData?.content) {
        handleAutoSave();
      }
    }, 3000);

    return () => clearTimeout(autoSaveTimer);
  }, [postData]);

  const handleAutoSave = useCallback(() => {
    setAutoSaveStatus('saving');
    
    setTimeout(() => {
      setAutoSaveStatus('saved');
      setLastSaved(new Date());
      
      setTimeout(() => {
        setAutoSaveStatus('idle');
      }, 2000);
    }, 1000);
  }, []);

  const handleInputChange = (field, value) => {
    setPostData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormat = (formatType) => {
    setActiveFormats(prev => {
      if (prev?.includes(formatType)) {
        return prev?.filter(f => f !== formatType);
      }
      return [...prev, formatType];
    });
  };

  const handleSaveDraft = async () => {
    if (!postData?.title?.trim()) {
      alert('Please add a title before saving');
      return;
    }

    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
      alert('Draft saved successfully!');
    }, 1500);
  };

  const handlePreview = () => {
    if (!postData?.title?.trim() || !postData?.content?.trim()) {
      alert('Please add title and content before previewing');
      return;
    }
    
    console.log('Preview post:', postData);
    alert('Preview functionality would open in a new window');
  };

  const handlePublish = async () => {
    if (!postData?.title?.trim()) {
      alert('Please add a title before publishing');
      return;
    }

    if (!postData?.content?.trim()) {
      alert('Please add content before publishing');
      return;
    }

    if (postData?.tags?.length === 0) {
      const confirmPublish = window.confirm('No tags added. Tags help readers discover your content. Publish anyway?');
      if (!confirmPublish) return;
    }

    setIsPublishing(true);
    
    setTimeout(() => {
      setIsPublishing(false);
      alert('Post published successfully!');
      navigate('/subscription-feed');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ContentContext
        type="creation"
        onSave={handleSaveDraft}
        onPublish={handlePublish}
        isSaving={isSaving}
        isPublishing={isPublishing}
      />
      <main className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
                  Create New Post
                </h1>
                <AutoSaveIndicator status={autoSaveStatus} lastSaved={lastSaved} />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-caption font-medium text-foreground">
                      Title *
                    </label>
                    <span className="text-xs font-caption text-muted-foreground data-text">
                      {charCounts?.title}/100
                    </span>
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter your post title..."
                    value={postData?.title}
                    onChange={(e) => handleInputChange('title', e?.target?.value)}
                    maxLength={100}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-caption font-medium text-foreground">
                      Subtitle
                    </label>
                    <span className="text-xs font-caption text-muted-foreground data-text">
                      {charCounts?.subtitle}/200
                    </span>
                  </div>
                  <Input
                    type="text"
                    placeholder="Add a subtitle (optional)..."
                    value={postData?.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e?.target?.value)}
                    maxLength={200}
                  />
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg overflow-hidden shadow-warm">
                <EditorToolbar 
                  onFormat={handleFormat}
                  activeFormats={activeFormats}
                />
                
                <div className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-caption font-medium text-foreground">
                        Content *
                      </label>
                      <span className="text-xs font-caption text-muted-foreground data-text">
                        {charCounts?.content} characters
                      </span>
                    </div>
                    <textarea
                      placeholder="Start writing your story..."
                      value={postData?.content}
                      onChange={(e) => handleInputChange('content', e?.target?.value)}
                      className="w-full min-h-[400px] md:min-h-[500px] px-4 py-3 bg-background border border-input rounded-md text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-y transition-editorial"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="lg:hidden">
                <MediaUploader
                  onImageUpload={(images) => {
                    if (Array.isArray(images)) {
                      handleInputChange('uploadedImages', images);
                    } else {
                      handleInputChange('uploadedImages', [...postData?.uploadedImages, images]);
                    }
                  }}
                  uploadedImages={postData?.uploadedImages}
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <div className="bg-card border border-border rounded-lg p-6 shadow-warm">
                  <PublishingControls
                    privacy={postData?.privacy}
                    onPrivacyChange={(value) => handleInputChange('privacy', value)}
                    scheduleDate={postData?.scheduleDate}
                    onScheduleDateChange={(value) => handleInputChange('scheduleDate', value)}
                    onSaveDraft={handleSaveDraft}
                    onPreview={handlePreview}
                    onPublish={handlePublish}
                    isSaving={isSaving}
                    isPublishing={isPublishing}
                    lastSaved={lastSaved}
                  />
                </div>

                <div className="bg-card border border-border rounded-lg p-6 shadow-warm">
                  <TagManager
                    selectedTags={postData?.tags}
                    onTagsChange={(tags) => handleInputChange('tags', tags)}
                  />
                </div>

                <div className="hidden lg:block bg-card border border-border rounded-lg p-6 shadow-warm">
                  <MediaUploader
                    onImageUpload={(images) => {
                      if (Array.isArray(images)) {
                        handleInputChange('uploadedImages', images);
                      } else {
                        handleInputChange('uploadedImages', [...postData?.uploadedImages, images]);
                      }
                    }}
                    uploadedImages={postData?.uploadedImages}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostCreation;