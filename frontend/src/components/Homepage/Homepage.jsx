import React, { useState, useEffect } from 'react';
import './Homepage.css';

const Homepage = () => {
  const [clubs, setClubs] = useState([]);

  // Fetch clubs data on component mount
  useEffect(() => {
    fetch('/api/clubs')
      .then((res) => res.json())
      .then((data) => setClubs(data.clubs || [])) // Assume the API returns a `clubs` array
      .catch((err) => console.error('Error fetching clubs:', err));
  }, []);

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>The List Clubs</h1>
        <select className="city-dropdown">
          <option value="new-york">New York</option>
          <option value="los-angeles">Los Angeles</option>
          <option value="miami">Miami</option>
          {/* Add more cities */}
        </select>
      </header>

      <div className="club-grid">
        {clubs.map((club) => (
          <div key={club.id} className="club-card">
            <img
              src={club.main_image_url}
              alt={club.name}
              className="club-image"
            />
            <div className="club-details">
              <h2 className="club-name">{club.name}</h2>
              <p className="club-address">{club.city}, {club.state}</p>
              <p className="club-price-range">Price Range: {club.price_range}</p>
              <p className="club-rating">
                ⭐ {club.avg_rating ? club.avg_rating.toFixed(1) : 'New'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
