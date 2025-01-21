import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useClubs } from '../../context/ClubContext';  
import './Homepage.css';

const Homepage = () => {
  const { clubs, setClubs } = useClubs();  
  const [selectedCity, setSelectedCity] = useState('New York City');
  const navigate = useNavigate(); 


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/session');  
        const data = await response.json();
        
        if (!data.user) {
          navigate('/');  
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        navigate('/');  
      }
    };

    checkAuth();
  }, [navigate]);


  useEffect(() => {
    fetch(`/api/clubs?major_city=${encodeURIComponent(selectedCity)}`)
      .then((res) => res.json())
      .then((data) => setClubs(data || []))
      .catch((err) => console.error('Error fetching clubs:', err));
  }, [selectedCity, setClubs]);


  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleCardClick = (id) => {
    navigate(`/club/${id}`); 
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
            onClick={() => handleCardClick(club.id)} 
            style={{ cursor: 'pointer' }} 
          >
            <img
              src={club.main_image_url}
              alt={club.name}
              className="club-image"
            />
            <div className="club-details">
              <h2 className="club-name">
                {club.name}{' '}
                {club.avg_rating && club.review_count > 0 ? (
                  <span className="club-rating">⭐ {parseFloat(club.avg_rating).toFixed(1)}</span>
                ) : (
                  <span className="club-rating new-club-badge">⭐ New</span>
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
