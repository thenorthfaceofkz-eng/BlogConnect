import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import PostCard from './components/PostCard';
import FilterBar from './components/FilterBar';
import SuggestedAuthors from './components/SuggestedAuthors';
import SubscriptionStats from './components/SubscriptionStats';
import EmptyFeedState from './components/EmptyFeedState';
import LoadingSkeleton from './components/LoadingSkeleton';

const SubscriptionFeed = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTag, setSelectedTag] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const mockPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2026",
    excerpt: "As we move deeper into 2026, the web development landscape continues to evolve at a rapid pace. From AI-powered development tools to revolutionary frameworks, discover the trends that are shaping the future of how we build for the web.",
    authorName: "Sarah Mitchell",
    authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b43e8b7f-1763295504724.png",
    authorAvatarAlt: "Professional headshot of woman with shoulder-length brown hair wearing navy blazer and white blouse",
    publishedDate: new Date(2026, 0, 25, 10, 30),
    readTime: "8 min read",
    featuredImage: "https://images.unsplash.com/photo-1629543371294-68ada742c5fd",
    featuredImageAlt: "Modern laptop displaying colorful code editor on wooden desk with coffee cup and notebook in bright office setting",
    tags: ["Technology", "Web Development", "Trends"],
    likes: 342,
    comments: 28,
    views: 1847,
    isPrivate: false
  },
  {
    id: 2,
    title: "Mastering the Art of Minimalist Design",
    excerpt: "Less is more has never been more relevant. Explore the principles of minimalist design and learn how to create stunning, functional interfaces that prioritize user experience through simplicity and intentional design choices.",
    authorName: "Marcus Chen",
    authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd15b436-1763300581767.png",
    authorAvatarAlt: "Professional headshot of Asian man with short black hair wearing gray suit and glasses",
    publishedDate: new Date(2026, 0, 24, 14, 15),
    readTime: "6 min read",
    featuredImage: "https://images.unsplash.com/photo-1709879714093-1de894927710",
    featuredImageAlt: "Clean minimalist workspace with white desk, modern lamp, and single potted plant against white wall",
    tags: ["Design", "UI/UX", "Minimalism"],
    likes: 289,
    comments: 19,
    views: 1523,
    isPrivate: false
  },
  {
    id: 3,
    title: "Building Sustainable Tech: A Developer\'s Responsibility",
    excerpt: "The environmental impact of technology is undeniable. As developers, we have a responsibility to build sustainable solutions. This article explores practical approaches to green coding and energy-efficient development practices.",
    authorName: "Elena Rodriguez",
    authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1975607e9-1763295500639.png",
    authorAvatarAlt: "Professional headshot of Hispanic woman with long dark hair wearing green blouse and warm smile",
    publishedDate: new Date(2026, 0, 23, 9, 45),
    readTime: "10 min read",
    featuredImage: "https://images.unsplash.com/photo-1542831371-d531d36971e6",
    featuredImageAlt: "Green digital code flowing on dark screen representing sustainable technology and eco-friendly programming",
    tags: ["Sustainability", "Technology", "Environment"],
    likes: 456,
    comments: 34,
    views: 2341,
    isPrivate: false
  },
  {
    id: 4,
    title: "The Psychology Behind User Engagement",
    excerpt: "Understanding what makes users click, stay, and return is crucial for any digital product. Dive deep into the psychological principles that drive user engagement and learn how to apply them ethically in your designs.",
    authorName: "Dr. James Wilson",
    authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11d3fe0bf-1763293073701.png",
    authorAvatarAlt: "Professional headshot of middle-aged man with gray hair and beard wearing dark blue suit and tie",
    publishedDate: new Date(2026, 0, 22, 16, 20),
    readTime: "12 min read",
    featuredImage: "https://images.unsplash.com/photo-1647964184283-76030bd9d6e2",
    featuredImageAlt: "Person using smartphone with colorful app interface showing engagement metrics and user interaction patterns",
    tags: ["Psychology", "UX Design", "User Engagement"],
    likes: 523,
    comments: 42,
    views: 2876,
    isPrivate: false
  },
  {
    id: 5,
    title: "Exclusive: Advanced React Patterns for Enterprise Applications",
    excerpt: "This members-only article reveals advanced React patterns used by Fortune 500 companies. Learn about compound components, render props evolution, and state management strategies that scale.",
    authorName: "Sarah Mitchell",
    authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b43e8b7f-1763295504724.png",
    authorAvatarAlt: "Professional headshot of woman with shoulder-length brown hair wearing navy blazer and white blouse",
    publishedDate: new Date(2026, 0, 21, 11, 0),
    readTime: "15 min read",
    featuredImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1ec7bc2b7-1766505190160.png",
    featuredImageAlt: "Modern office workspace with multiple monitors displaying React code and component architecture diagrams",
    tags: ["React", "Enterprise", "Advanced"],
    likes: 678,
    comments: 56,
    views: 3245,
    isPrivate: true
  },
  {
    id: 6,
    title: "From Idea to Launch: A Startup Journey",
    excerpt: "Follow the complete journey of building and launching a successful SaaS product in 2026. Real challenges, honest failures, and the lessons learned along the way from conception to first paying customers.",
    authorName: "Alex Thompson",
    authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17fc21307-1763293959943.png",
    authorAvatarAlt: "Professional headshot of young man with short blonde hair wearing casual gray sweater and friendly smile",
    publishedDate: new Date(2026, 0, 20, 8, 30),
    readTime: "14 min read",
    featuredImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1649ccff3-1763295333634.png",
    featuredImageAlt: "Entrepreneur working on laptop in modern startup office with whiteboard showing business strategy and growth charts",
    tags: ["Startup", "Business", "Entrepreneurship"],
    likes: 412,
    comments: 38,
    views: 2134,
    isPrivate: false
  }];


  const mockSuggestedAuthors = [
  {
    id: 1,
    name: "David Park",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17e3e8a83-1763296144451.png",
    avatarAlt: "Professional headshot of Asian man with short black hair wearing blue shirt and confident expression",
    bio: "Full-stack developer sharing insights on modern web technologies and cloud architecture",
    followers: 12500,
    posts: 87
  },
  {
    id: 2,
    name: "Lisa Anderson",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17187f2d5-1763301571161.png",
    avatarAlt: "Professional headshot of woman with red hair wearing black blazer and professional smile",
    bio: "UX researcher and design strategist helping teams build better digital experiences",
    followers: 8900,
    posts: 64
  },
  {
    id: 3,
    name: "Mohammed Hassan",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_167f9752b-1763295933906.png",
    avatarAlt: "Professional headshot of Middle Eastern man with dark hair and beard wearing white shirt",
    bio: "Tech entrepreneur and startup advisor writing about innovation and business growth",
    followers: 15200,
    posts: 102
  },
  {
    id: 4,
    name: "Jennifer Kim",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12ffe0547-1763294341876.png",
    avatarAlt: "Professional headshot of Asian woman with long black hair wearing red blouse and warm smile",
    bio: "Product manager sharing lessons on building products users love and team leadership",
    followers: 10800,
    posts: 73
  }];


  const mockStats = {
    subscriptions: 24,
    postsRead: 156,
    totalLikes: 342,
    comments: 89
  };

  const availableTags = [
  "Technology",
  "Design",
  "Web Development",
  "Business",
  "Startup",
  "Psychology",
  "Sustainability",
  "React",
  "UI/UX",
  "Entrepreneurship"];


  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const filteredPosts = posts?.filter((post) => {
    if (selectedTag === 'all') return true;
    return post?.tags?.includes(selectedTag);
  })?.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b?.publishedDate - a?.publishedDate;
      case 'oldest':
        return a?.publishedDate - b?.publishedDate;
      case 'popular':
        return b?.likes - a?.likes;
      case 'trending':
        return b?.views - a?.views;
      default:
        return 0;
    }
  });

  return (
    <>
      <Helmet>
        <title>Your Feed - BlogConnect</title>
        <meta name="description" content="Discover the latest posts from authors you follow on BlogConnect. Stay updated with personalized content from your favorite writers." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-10 lg:py-12">
            <SubscriptionStats stats={mockStats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-2 space-y-6">
                <FilterBar
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  selectedTag={selectedTag}
                  onTagChange={setSelectedTag}
                  availableTags={availableTags}
                  onRefresh={handleRefresh} />


                {isLoading ?
                <LoadingSkeleton /> :
                filteredPosts?.length === 0 ?
                <EmptyFeedState /> :

                <div className="space-y-6">
                    {filteredPosts?.map((post) =>
                  <PostCard key={post?.id} post={post} />
                  )}
                  </div>
                }

                {!isLoading && filteredPosts?.length > 0 &&
                <div className="flex justify-center pt-6">
                    <button className="px-6 py-3 bg-card hover:bg-muted border border-border rounded-lg text-foreground font-caption text-sm font-medium transition-editorial shadow-warm hover:shadow-warm-md">
                      Load More Posts
                    </button>
                  </div>
                }
              </div>

              <div className="space-y-6">
                <SuggestedAuthors authors={mockSuggestedAuthors} />

                <div className="bg-card rounded-xl border border-border shadow-warm p-4 md:p-5 lg:p-6">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-editorial text-left">
                      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary text-sm font-caption font-medium">24</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-caption font-medium text-foreground">
                          Manage Subscriptions
                        </div>
                        <div className="text-xs font-caption text-muted-foreground">
                          View all followed authors
                        </div>
                      </div>
                    </button>

                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-editorial text-left">
                      <div className="w-8 h-8 rounded-md bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-secondary text-sm font-caption font-medium">12</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-caption font-medium text-foreground">
                          Saved Posts
                        </div>
                        <div className="text-xs font-caption text-muted-foreground">
                          Your bookmarked articles
                        </div>
                      </div>
                    </button>

                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-editorial text-left">
                      <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-accent text-sm font-caption font-medium">5</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-caption font-medium text-foreground">
                          Reading List
                        </div>
                        <div className="text-xs font-caption text-muted-foreground">
                          Posts to read later
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>);

};

export default SubscriptionFeed;