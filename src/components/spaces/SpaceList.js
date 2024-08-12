
// src/components/spaces/SpaceList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SpaceList = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await axios.get('/api/spaces');
        setSpaces(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching spaces:', err);
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-list">
      <h2>All Spaces</h2>
      {spaces.map(space => (
        <div key={space._id} className="space-item">
          <h3><Link to={`/spaces/${space._id}`}>{space.name}</Link></h3>
          <p>{space.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SpaceList;
