import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateClubModal from '../CreateClubModal';  
import { useNavigate } from 'react-router-dom'; 
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);  
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    window.location = '/';
  };

  const goMyBookings = () => {
    navigate('/bookings');
    closeMenu();
  };

  const goManageClubs = () => {
    navigate('/manage-clubs');
    closeMenu();
  };

  return (
    <div className="profile-button-container">
      <button onClick={toggleMenu} className="profile-icon">
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={ulRef}>
          {user ? (
            <>
              <li className="profile-info">
                <p className="user-name">{user.firstName} {user.lastName}</p>
                <p className="user-email">{user.email}</p>
              </li>
              <li>
                <button onClick={goMyBookings} className="dropdown-button">My Bookings</button>
              </li>
              {user.role === 'owner' && (
                <>
                  <li>
                    <button onClick={goManageClubs} className="dropdown-button">Manage Clubs</button>
                  </li>
                  <li>
                    <button onClick={() => setIsCreateModalOpen(true)} className="dropdown-button">Create Club</button>
                  </li>
                </>
              )}
              <li>
                <button onClick={logout} className="dropdown-button">Log Out</button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}

      {isCreateModalOpen && (
        <CreateClubModal 
          onClose={() => setIsCreateModalOpen(false)} 
          onSave={(newClub) => {
            console.log('New club created:', newClub);
            setIsCreateModalOpen(false);
          }} 
        />
      )}
    </div>
  );
}

export default ProfileButton;
