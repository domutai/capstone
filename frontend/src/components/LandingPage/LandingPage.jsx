import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, fetchSessionUser } from '../../store/session'; 
import { useModal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal'; 
import SignupFormModal from '../SignupFormModal'; 
import './LandingPage.css';
import clubMusic from '../../assets/music/club-music.mp3';

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setModalContent, openModal } = useModal();
  const user = useSelector((state) => state.session.user); // Access the logged-in user
  const [audio] = useState(() => {
    const newAudio = new Audio(clubMusic);
    newAudio.loop = true; // Enable looping
    return newAudio;
  });
  const [menuVisible, setMenuVisible] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  // Fetch session data on component mount
  useEffect(() => {
    dispatch(fetchSessionUser()); // Fetch session to ensure role is always up-to-date
  }, [dispatch]);

  // Redirect logged-in users to /clubs
  useEffect(() => {
    if (user) {
      navigate('/clubs');
    }
  }, [user, navigate]);

  const handleButtonClick = () => {
    setMenuVisible(!menuVisible);

    if (!isFlashing) {
      setIsFlashing(true); // Start flashing effect
      audio.play()
        .then(() => console.log('Audio started playing'))
        .catch((err) => console.error('Error playing audio:', err));
    }
  };

  const handleDemoUserLogin = async () => {
    try {
      const user = await dispatch(login({ email: 'demoUser@test.com', password: 'password' }));
      if (user) {
        await dispatch(fetchSessionUser()); // Refresh session after login
        navigate('/clubs'); // Redirect to the homepage
      }
    } catch (err) {
      console.error('Demo user login failed:', err);
    }
  };

  const handleDemoOwnerLogin = async () => {
    try {
      const user = await dispatch(login({ email: 'demoOwner@test.com', password: 'password' }));
      if (user) {
        await dispatch(fetchSessionUser()); // Refresh session after login
        navigate('/clubs'); // Redirect to the homepage
      }
    } catch (err) {
      console.error('Demo owner login failed:', err);
    }
  };

  const openLoginModal = () => {
    setModalContent(<LoginFormModal />);
    openModal();
  };

  const openSignupModal = () => {
    setModalContent(<SignupFormModal />);
    openModal();
  };

  // Stop the audio when the component unmounts
  useEffect(() => {
    return () => {
      audio.pause(); // Stop the audio
      audio.currentTime = 0; // Reset playback to the start
    };
  }, [audio]);

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
        <button className="menu-item" onClick={openLoginModal}>
          Login
        </button>
        <button className="menu-item" onClick={openSignupModal}>
          Register
        </button>
        <button className="menu-item" onClick={handleDemoUserLogin}>
          Demo User
        </button>
        <button className="menu-item" onClick={handleDemoOwnerLogin}>
          Demo Owner
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
