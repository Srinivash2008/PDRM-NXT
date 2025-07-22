import * as ActionTypes from '../constants/actionTypes';
import { jwtDecode } from 'jwt-decode';
const initialState = {
  user: null,
  rolePermissions: [],
  loading: false,
  error: null,
  message: null,
  isLoggedIn: false,
  isRegistered: false,
};

// Utility function to save user data to session storage
const saveUserToSessionStorage = (user, token) => {
  sessionStorage.setItem('user', JSON.stringify(user));
  sessionStorage.setItem('token', JSON.stringify(token));
};

// Utility function to check if user is logged in from session storage
const isUserLoggedInFromSessionStorage = () => {
  const token = sessionStorage.getItem('token');
  const user = sessionStorage.getItem('user');
  return token !== null && user !== null;
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_START:
      return { ...state, user: null, loading: true, error: null, message: null, isLoggedIn: false, isRegistered: false };
    case ActionTypes.LOGIN_SUCCESS:
      let userData = jwtDecode(action.payload.result);
      const logged_user = {
        exp: userData.exp,
        iat: userData.iat,
        id: userData.id,
        online_created_at: userData.online_created_at,
        online_is_active: userData.online_is_active,
        publisherId: userData.publisherId,
        role: userData.role,
        userAddress: userData.userAddress,
        userCreatedAt: userData.userCreatedAt,
        userEmail: userData.userEmail,
        userFirstName: userData.userFirstName,
        userLastName: userData.userLastName,
        userMobileNo: userData.userMobileNo,
        username: userData.username
      }

      saveUserToSessionStorage(logged_user, action.payload.result);
      return { ...state, user: logged_user, loading: false, message: 'Login successful', isLoggedIn: true, isRegistered: false, rolePermissions :userData?.userRolePermissions || [] };
    case ActionTypes.LOGIN_FAILURE:
      return { ...state, user: null, error: action.payload, loading: false, message: 'Login failed', isLoggedIn: false, isRegistered: false };

    case ActionTypes.LOGOUT:
      
      // Remove user data from session storage
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      return { ...initialState };

    default:
      // Check if user is logged in from session storage
      if (isUserLoggedInFromSessionStorage()) {
        let userData = jwtDecode(sessionStorage.getItem('token'));
        return { ...state, isLoggedIn: true, user: JSON.parse(sessionStorage.getItem('user')), rolePermissions :userData?.userRolePermissions || [] };
      }
      return state;
  }
};

export default authReducer;