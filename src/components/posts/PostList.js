// src/components/posts/PostList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="post-list">
      <h2>All Posts</h2>
      {posts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;