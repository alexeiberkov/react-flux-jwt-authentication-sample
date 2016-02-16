import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants.js';
import RouterContainer from '../services/RouterContainer'

export default {
  loginUser: (jwt, rememberMe) => {
    var savedJwt = localStorage.getItem('jwt');
    rememberMe = rememberMe || false;

    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      jwt: jwt
    });
    
    if (savedJwt !== jwt) {
      var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';

      RouterContainer.get().transitionTo(nextPath);

      if(rememberMe) {
        localStorage.setItem('jwt', jwt);
      }
    }
  },
  logoutUser: () => {
    RouterContainer.get().transitionTo('/login');
    localStorage.removeItem('jwt');
    AppDispatcher.dispatch({
      actionType: LOGOUT_USER
    });
  }
}
