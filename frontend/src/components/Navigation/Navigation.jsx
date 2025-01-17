import { NavLink } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import thelist from '../../assets/Images/thelist.png';
import { fetchSessionUser } from '../../store/session';
import { useEffect } from 'react';



function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

    useEffect(() => {
      if (!sessionUser) {
        dispatch(fetchSessionUser()); 
      }
    }, [dispatch, sessionUser]);

  return (
  <nav className="navigation-container">
    <NavLink to="/" className="logo-link">
    <div className="app-logo-name">
    <img src={thelist} alt="App Logo" className="app-logo" /> 
    <span className="app-name">The List</span>
    </div>
    </NavLink>
    <ul className="navigation-list">
  {isLoaded && (
    <>
            {/* Show the user's role */}
            {sessionUser && (
              <li className="navigation-item user-role">
                <span>Role: {sessionUser.role}</span>
              </li>
            )}
      {/* Profile button is available to all users */}
      <li className="navigation-item">
        <ProfileButton user={sessionUser} />
      </li>
    </>
  )}
</ul>
    </nav>
  );
}

export default Navigation;