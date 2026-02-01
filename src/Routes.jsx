import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import PostCreation from './pages/post-creation';
import PostDetail from './pages/post-detail';
import UserRegistration from './pages/user-registration';
import SubscriptionFeed from './pages/subscription-feed';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<SubscriptionFeed />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/post-creation" element={<PostCreation />} />
        <Route path="/post-detail" element={<PostDetail />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/subscription-feed" element={<SubscriptionFeed />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
