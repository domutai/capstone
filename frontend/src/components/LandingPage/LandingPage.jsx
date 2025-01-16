import { useState } from 'react';
import './LandingPage.css';
import clubMusic from '../../assets/music/club-music.mp3';


const LandingPage = () => {
    const [audio] = useState(() => {
      const newAudio = new Audio(clubMusic);
      newAudio.loop = true; // Enable looping
      return newAudio;
    });
    const [menuVisible, setMenuVisible] = useState(false);
    const [isFlashing, setIsFlashing] = useState(false);
  
    const handleButtonClick = () => {
      setMenuVisible(!menuVisible);
  
      if (!isFlashing) {
        setIsFlashing(true); // Start flashing effect
        audio.play()
          .then(() => console.log('Audio started playing'))
          .catch((err) => console.error('Error playing audio:', err));
      }
    };
  
    return (
      <div className="landing-container">
        <div className="text-container">
          <h1 className={`animated-text ${isFlashing ? 'flashing' : ''}`}>
            Are you on the list?
          </h1>
        </div>
        <button className="yes-button" onClick={handleButtonClick}>
          Yes
        </button>
        <div className={`menu-container ${menuVisible ? 'show' : ''}`}>
          <button className="menu-item">Login</button>
          <button className="menu-item">Register</button>
          <button className="menu-item">Demo User</button>
          <button className="menu-item">Demo Owner</button>
        </div>
      </div>
    );
  };
  
  export default LandingPage;
  