
// src/components/spaces/SpaceDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostList from '../posts/PostList';

const SpaceDetail = () => {
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const res = await axios.get(`/api/spaces/${id}`);
        setSpace(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching space:', err);
        setLoading(false);
      }
    };

    fetchSpace();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!space) return <div>Space not found</div>;

  return (
    <div className="space-detail">
      <h2>{space.name}</h2>
      <p>{space.description}</p>
      <h3>Posts in this Space</h3>
      <PostList spaceId={space._id} />
    </div>
  );
};

export default SpaceDetail;