import { NavLink } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import janbIcon from '../../assets/Images/janbIcon.png';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
  <nav className="navigation-container">
    <NavLink to="/" className="logo-link">
    <div className="app-logo-name">
    <img src={janbIcon} alt="App Logo" className="app-logo" /> 
    <span className="app-name">The List</span>
    </div>
    </NavLink>
    <ul className="navigation-list">
  {isLoaded && (
    <>
      {/* Only show "Create a New Spot" link if the user is logged in */}
      {sessionUser && (
        <li className="navigation-item create-new-spot">
          <NavLink to="/spots">Create a New Spot</NavLink> {/* New link added */}
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