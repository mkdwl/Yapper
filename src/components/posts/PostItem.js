// src/components/posts/PostItem.js
import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  return (
    <div className="post-item">
      <h3><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
      <p>{post.content.substring(0, 100)}...</p>
      <small>By: {post.author.username}</small>
    </div>
  );
};

export default PostItem;
