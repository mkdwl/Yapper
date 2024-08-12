// src/components/posts/PostDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>By: {post.author.username}</small>
      <CommentList comments={post.comments} />
      <CommentForm postId={post._id} />
    </div>
  );
};

export default PostDetail;
