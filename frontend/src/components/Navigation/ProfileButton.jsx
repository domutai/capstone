//Use OpenModelMenuItem
//THIS WAS THE ONE USED BEFORE
// import { useState, useEffect, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import { FaUserCircle } from 'react-icons/fa';
// import * as sessionActions from '../../store/session';
// import OpenModalMenuItem from './OpenModalMenuItem';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate


// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Initialize useNavigate
//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();

//   const toggleMenu = (e) => {
//     e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
//     setShowMenu(!showMenu);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener('click', closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const closeMenu = () => setShowMenu(false);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//     closeMenu();
//     window.location = '/'; // Redirect to homepage
//   };

//   const goToManageSpots = () => {
//     navigate('/spots/current'); // Navigate to Manage Spots page
//     closeMenu(); // Close the menu after navigation
//   };

//   const goToManageReviews = () => {
//     navigate('/reviews/current'); // Navigate to Manage Reviews page
//     closeMenu(); // Close the menu after navigation
//   };

//   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//   return (
//     <>
//       <button onClick={toggleMenu}>
//         <FaUserCircle />
//       </button>
//       <ul className={ulClassName} ref={ulRef}>
//         {user ? (
//            <>
//            <li>Hello, {user.firstName}</li>
//            <li>{user.email}</li>
//            <li>
//              <button onClick={goToManageSpots}>Manage Spots</button>
//            </li>
//            <li>
//               <button onClick={goToManageReviews}>Manage Reviews</button>
//             </li>
//            <li>
//              <button onClick={logout}>Log Out</button>
//            </li>
//          </>
//        ) : (
//           <>
//             <OpenModalMenuItem
//               itemText="Log In"
//               onItemClick={closeMenu}
//               modalComponent={<LoginFormModal />}
//             />
//             <OpenModalMenuItem
//               itemText="Sign Up"
//               onItemClick={closeMenu}
//               modalComponent={<SignupFormModal />}
//             />
//           </>
//         )}
//       </ul>
//     </>
//   );
// }

// export default ProfileButton;

//MADE FOR CLUBS
// import { useState, useEffect, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import { FaUserCircle } from 'react-icons/fa';
// import * as sessionActions from '../../store/session';
// import OpenModalMenuItem from './OpenModalMenuItem';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
// import { useNavigate } from 'react-router-dom'; 

// import CreateClubModal from '../CreateClubModal';


// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); 
//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();

//   const toggleMenu = (e) => {
//     e.stopPropagation(); 
//     setShowMenu(!showMenu);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener('click', closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const closeMenu = () => setShowMenu(false);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//     closeMenu();
//     window.location = '/'; // Redirect to homepage
//   };

//   const goMyBookings = () => {
//     navigate('/bookings'); 
//     closeMenu(); // Close the menu after navigation
//   };

//   const goManageClubs = () => {
//     navigate('/manage-clubs'); 
//     closeMenu(); // Close the menu after navigation
//   };


//   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//   return (
//     <>
//       <button onClick={toggleMenu}>
//         <FaUserCircle />
//       </button>
//       <ul className={ulClassName} ref={ulRef}>
//         {user ? (
//            <>
//            <li>{user.firstName} {user.lastName}</li>
//            <li>{user.email}</li>
//            <li>
//              <button onClick={goMyBookings}>My Bookings</button>
//            </li>
//            <li>
//              <button onClick={goManageClubs}>Manage Clubs</button>
//            </li>
//            <li>
//               <OpenModalMenuItem
//                 itemText="Create Club"
//                 onItemClick={closeMenu}
//                 modalComponent={<CreateClubModal onClose={closeMenu} onSave={(newClub) => console.log('New club created:', newClub)} />}
//               />
//             </li>
//            <li>
//              <button onClick={logout}>Log Out</button>
//            </li>
//          </>
//        ) : (
//           <>
//             <OpenModalMenuItem
//               itemText="Log In"
//               onItemClick={closeMenu}
//               modalComponent={<LoginFormModal />}
//             />
//             <OpenModalMenuItem
//               itemText="Sign Up"
//               onItemClick={closeMenu}
//               modalComponent={<SignupFormModal />}
//             />
//           </>
//         )}
//       </ul>
//     </>
//   );
// }

// export default ProfileButton;

//AFTER ADDING CREATE CLUB MODALE
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateClubModal from '../CreateClubModal';  // Import CreateClubModal
import { useNavigate } from 'react-router-dom'; 

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);  // State for Create Club modal
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

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={goMyBookings}>My Bookings</button>
            </li>
            <li>
              <button onClick={goManageClubs}>Manage Clubs</button>
            </li>
            <li>
              <button onClick={() => setIsCreateModalOpen(true)}>Create Club</button>
            </li>
            <li>
              <button onClick={logout}>Log Out</button>
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

      {/* Create Club Modal - Only renders when isCreateModalOpen is true */}
      {isCreateModalOpen && (
        <CreateClubModal 
          onClose={() => setIsCreateModalOpen(false)} 
          onSave={(newClub) => {
            console.log('New club created:', newClub);
            setIsCreateModalOpen(false);  // Close modal after saving
          }} 
        />
      )}
    </>
  );
}

export default ProfileButton;

