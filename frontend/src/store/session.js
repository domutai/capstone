import { csrfFetch } from './csrf';  

// Action Types
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

// Action Creators
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

// // Thunk Action for Logging In
// export const login = (user) => async (dispatch) => {
//   const { email, password } = user;
//   const response = await csrfFetch("/api/session", {
//     method: "POST",
//     body: JSON.stringify({ email, password })
//   });
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };


//New frontend log in
// Thunk Action for Logging In
export const login = (user) => async (dispatch) => {
  const { email, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user)); 
    return response;
  } else {
    console.error('Login failed');
    throw new Error('Login failed');
  }
};

// Initial state for the session reducer
const initialState = { user: null };

// Reducer to handle session state
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

//Fetch session action
export const fetchSessionUser = () => async (dispatch) => {
  const response = await fetch('/api/session'); 
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user)); 
  }
};

//Thunk action for Restoring Session User across a refresh
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};


// Sign Up Thunk Action with Role
export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, email, password, role } = user; 
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      role, 
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  } else {
    console.error('Signup failed');
    throw new Error('Signup failed');
  }
};


//Logout Thunk Action Phase 3
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return response;
};

export default sessionReducer;
