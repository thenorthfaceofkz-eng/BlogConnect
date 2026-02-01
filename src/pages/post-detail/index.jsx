import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ContentContext from '../../components/ui/ContentContext';
import PostHeader from './components/PostHeader';
import PostContent from './components/PostContent';
import PostActions from './components/PostActions';
import CommentSection from './components/CommentSection';
import AuthorCard from './components/AuthorCard';
import RelatedPosts from './components/RelatedPosts';
import AccessRequestModal from './components/AccessRequestModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';



const PostDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postId = searchParams?.get('id') || '1';

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [hasAccess, setHasAccess] = useState(true);

  const mockPost = {
    id: postId,
    title: "The Art of Mindful Living: Finding Peace in a Chaotic World",
    excerpt: "Discover practical strategies for incorporating mindfulness into your daily routine and transforming your relationship with stress, anxiety, and the present moment.",
    content: `In our fast-paced modern world, finding moments of peace and clarity can feel like an impossible task. We're constantly bombarded with notifications, deadlines, and endless to-do lists that leave us feeling overwhelmed and disconnected from ourselves.

## Understanding Mindfulness

Mindfulness is more than just a buzzword—it's a transformative practice that can fundamentally change how we experience life. At its core, mindfulness is about being fully present in the current moment, without judgment or distraction.

The practice originated in ancient Buddhist traditions but has been adapted and validated by modern psychology and neuroscience. Research shows that regular mindfulness practice can reduce stress, improve focus, enhance emotional regulation, and even change the physical structure of our brains.

# Starting Your Practice

Beginning a mindfulness practice doesn't require hours of meditation or special equipment. Start with just five minutes a day of focused breathing. Find a quiet space, sit comfortably, and simply observe your breath as it flows in and out.

Notice when your mind wanders—and it will wander, that's completely normal. The practice isn't about stopping thoughts but about noticing them without getting caught up in them. Each time you notice your mind has drifted, gently bring your attention back to your breath.

## Integrating Mindfulness into Daily Life

The real power of mindfulness comes when we bring it into our everyday activities. Try eating one meal a day mindfully, paying attention to the colors, textures, and flavors of your food. Practice mindful walking, feeling each step and noticing the sensations in your body.

Even mundane tasks like washing dishes or brushing your teeth can become opportunities for mindfulness. The key is to bring your full attention to whatever you're doing, rather than letting your mind race ahead to the next thing.

# Overcoming Common Challenges

Many people struggle with mindfulness at first. They feel restless, bored, or frustrated when their minds won't settle. Remember that these feelings are part of the practice. The goal isn't to achieve a particular state but to observe whatever arises with curiosity and compassion.

If sitting meditation feels too difficult, try movement-based practices like yoga or tai chi. If silence feels uncomfortable, use guided meditations or mindfulness apps. The most important thing is to find an approach that works for you and stick with it consistently.

## The Ripple Effect

As you develop your mindfulness practice, you'll likely notice changes extending beyond your meditation sessions. You might find yourself responding to stress more calmly, communicating more clearly, or appreciating simple pleasures more deeply.

These changes don't happen overnight, but with patience and persistence, mindfulness can become a natural part of how you move through the world. It's not about becoming a different person but about becoming more fully yourself—present, aware, and alive to each moment.`,
    featuredImage: "https://images.unsplash.com/photo-1596737118984-750b79a762f7",
    featuredImageAlt: "Serene woman meditating in lotus position on wooden deck surrounded by lush green plants during golden hour sunset",
    author: {
      id: "author-1",
      name: "Sarah Mitchell",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14da91c34-1763294780479.png",
      avatarAlt: "Professional headshot of woman with shoulder-length brown hair wearing navy blazer against neutral background",
      bio: "Mindfulness coach and wellness writer helping people find balance in modern life.",
      subscribers: 12500,
      posts: 87
    },
    tags: ["Mindfulness", "Wellness", "Mental Health", "Self-Care"],
    publishedAt: "2026-01-20T10:30:00Z",
    readTime: "8 min",
    views: 15234,
    likes: 892,
    comments: 45,
    isPrivate: false
  };

  const mockComments = [
  {
    id: "comment-1",
    author: {
      id: "user-1",
      name: "Michael Chen",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d4bf265f-1763294257447.png",
      avatarAlt: "Asian man with short black hair and glasses wearing casual blue shirt smiling at camera"
    },
    content: "This article really resonated with me. I've been trying to start a mindfulness practice for months, and your practical tips about starting with just 5 minutes make it feel so much more achievable. Thank you for sharing!",
    createdAt: "2026-01-21T14:20:00Z",
    likes: 23,
    replies: [
    {
      id: "reply-1",
      author: {
        id: "author-1",
        name: "Sarah Mitchell",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14da91c34-1763294780479.png",
        avatarAlt: "Professional headshot of woman with shoulder-length brown hair wearing navy blazer against neutral background"
      },
      content: "I'm so glad this helped! Remember, consistency matters more than duration. Those 5 minutes daily will compound into real change over time.",
      createdAt: "2026-01-21T15:45:00Z",
      likes: 12
    }]

  },
  {
    id: "comment-2",
    author: {
      id: "user-2",
      name: "Emma Rodriguez",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1811b6629-1763294904146.png",
      avatarAlt: "Hispanic woman with long dark hair wearing white blouse with warm smile in outdoor setting"
    },
    content: "I've been practicing mindfulness for about a year now, and it's completely transformed my relationship with stress. Your point about bringing mindfulness into daily activities is spot on—that's where the real magic happens.",
    createdAt: "2026-01-22T09:15:00Z",
    likes: 31,
    replies: []
  },
  {
    id: "comment-3",
    author: {
      id: "user-3",
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617",
      avatarAlt: "Caucasian man with short gray hair and beard wearing black turtleneck with professional demeanor"
    },
    content: "Great article! Could you recommend any specific apps or resources for beginners? I'd love to explore this further.",
    createdAt: "2026-01-23T11:30:00Z",
    likes: 18,
    replies: []
  }];


  const mockRelatedPosts = [
  {
    id: "2",
    title: "Building Resilience: Thriving Through Life's Challenges",
    excerpt: "Learn evidence-based strategies for developing mental and emotional resilience to navigate difficult times with grace and strength.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fa0d9301-1767694133874.png",
    imageAlt: "Person standing on mountain peak with arms raised triumphantly against dramatic cloudy sky at sunrise",
    tags: ["Resilience", "Mental Health"],
    publishedAt: "2026-01-15T08:00:00Z",
    views: 8932,
    likes: 456,
    readTime: "6 min"
  },
  {
    id: "3",
    title: "The Science of Gratitude: How Appreciation Changes Your Brain",
    excerpt: "Explore the neuroscience behind gratitude practices and discover how cultivating thankfulness can rewire your brain for happiness.",
    image: "https://images.unsplash.com/photo-1525085350339-d252aae63c33",
    imageAlt: "Close-up of hands writing in gratitude journal with coffee cup and flowers on wooden table in morning light",
    tags: ["Gratitude", "Neuroscience"],
    publishedAt: "2026-01-10T14:30:00Z",
    views: 11245,
    likes: 623,
    readTime: "7 min"
  }];


  const currentUserId = "user-current";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (platform) => {
    console.log(`Sharing to ${platform}`);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSubscribe = () => {
    setIsSubscribed(true);
  };

  const handleAddComment = (content, parentId = null) => {
    console.log('Adding comment:', content, 'Parent:', parentId);
  };

  const handleDeleteComment = (commentId) => {
    console.log('Deleting comment:', commentId);
  };

  const handleAccessRequest = async (message) => {
    console.log('Access request submitted:', message);
    setShowAccessModal(false);
  };

  if (!hasAccess && mockPost?.isPrivate) {
    return (
      <>
        <Header />
        <ContentContext type="detail" />
        <div className="min-h-screen bg-background pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-6">
                <Icon name="Lock" size={40} color="var(--color-warning)" />
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-4">
                Private Content
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                This post is private. Request access from the author to view the full content.
              </p>
              <Button
                variant="default"
                size="lg"
                onClick={() => setShowAccessModal(true)}
                iconName="Send"
                iconPosition="left">

                Request Access
              </Button>
            </div>
          </div>
        </div>
        <AccessRequestModal
          isOpen={showAccessModal}
          onClose={() => setShowAccessModal(false)}
          onSubmit={handleAccessRequest}
          authorName={mockPost?.author?.name} />

      </>);

  }

  return (
    <>
      <Header />
      <ContentContext
        type="detail"
        postData={mockPost}
        onBookmark={handleBookmark}
        onShare={() => handleShare('general')}
        isBookmarked={isBookmarked} />

      <div className="min-h-screen bg-background pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <PostHeader
            post={mockPost}
            onSubscribe={handleSubscribe}
            isSubscribed={isSubscribed} />


          <div className="mt-8 md:mt-12">
            <PostContent
              content={mockPost?.content}
              featuredImage={mockPost?.featuredImage}
              featuredImageAlt={mockPost?.featuredImageAlt} />

          </div>

          <div className="mt-12 md:mt-16 pt-8 border-t border-border">
            <AuthorCard
              author={mockPost?.author}
              onSubscribe={handleSubscribe}
              isSubscribed={isSubscribed} />

          </div>

          <div className="mt-12 md:mt-16 pt-8 border-t border-border">
            <CommentSection
              comments={mockComments}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
              currentUserId={currentUserId} />

          </div>

          <div className="mt-12 md:mt-16 pt-8 border-t border-border">
            <RelatedPosts posts={mockRelatedPosts} />
          </div>
        </div>
      </div>
      <PostActions
        post={mockPost}
        onLike={handleLike}
        onShare={handleShare}
        isLiked={isLiked} />

    </>);

};

export default PostDetail;