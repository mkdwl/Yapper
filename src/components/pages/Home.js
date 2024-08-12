// src/components/pages/Home.js
import React from 'react';
import FeaturedPosts from '../posts/FeaturedPosts';
import SpacesOverview from '../spaces/SpacesOverview';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Community Forum</h1>
      <FeaturedPosts />
      <SpacesOverview />
    </div>
  );
};

export default Home;