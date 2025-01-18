import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import ManageSpots from './components/ManageSpots/ManageSpots';
import UpdateSpot from './components/UpdateSpot';
import ManageReviews from './components/ManageReviews/ManageReviews';

import LandingPage from './components/LandingPage';
import Homepage from './components/Homepage';
import ClubDetails from './components/ClubDetails';

import 'react-datepicker/dist/react-datepicker.css';



function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
    {/* Render Navigation only if the current route is not '/' */}
    {location.pathname !== '/' && <Navigation isLoaded={isLoaded} />}
      {isLoaded ? <Outlet /> : <h1>Loading...</h1>}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/clubs',
        element: <Homepage />
      },
      {
        path: '/club/:id',
        element: <ClubDetails />
      },
      {
        path: '/spots/current',
        element: <ManageSpots />
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpot />
      },
      {
        path: '/reviews/current',
        element: <ManageReviews />,
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
