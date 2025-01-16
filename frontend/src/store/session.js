import { csrfFetch } from './csrf';  // import csrfFetch for making requests

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

// Thunk Action for Logging In
export const login = (user) => async (dispatch) => {
  const { email, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
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


//Thunk action for Restoring Session User across a refresh
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

//Sign Up Thunk Action
export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
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
