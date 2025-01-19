import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Homepage.css';

const Homepage = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedCity, setSelectedCity] = useState('New York City');
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch clubs whenever the selected city changes
  useEffect(() => {
    fetch(`/api/clubs?major_city=${encodeURIComponent(selectedCity)}`)
      .then((res) => res.json())
      .then((data) => setClubs(data || []))
      .catch((err) => console.error('Error fetching clubs:', err));
  }, [selectedCity]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // Handle navigation to ClubDetails page
  const handleCardClick = (id) => {
    navigate(`/club/${id}`); // Navigate to /club/:id when a club card is clicked
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Choose A City:</h1>
        <select className="city-dropdown" value={selectedCity} onChange={handleCityChange}>
          <option value="New York City">New York City</option>
          <option value="Los Angeles">Los Angeles</option>
        </select>
      </header>

      <div className="club-grid">
        {clubs.map((club) => (
          <div
            key={club.id}
            className="club-card"
            onClick={() => handleCardClick(club.id)} // Add onClick to navigate to ClubDetails
            style={{ cursor: 'pointer' }} // Add pointer cursor for interactivity
          >
            <img
              src={club.main_image_url}
              alt={club.name}
              className="club-image"
            />
            <div className="club-details">
              <h2 className="club-name">
                {club.name}{' '}
                {club.avg_rating && (
                  <span className="club-rating">
                    ⭐ {parseFloat(club.avg_rating).toFixed(1)}
                  </span>
                )}
              </h2>
              <p className="club-address">{club.location}</p>
              <p className="club-price-range">
                Price Range: ${club.min_price || 'N/A'} - ${club.max_price || 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
