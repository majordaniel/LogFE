import {createBrowserHistory,} from 'history'
import {isNull, showSuccess} from './index';
import {hideLoading, setAppState, showLoading, TOKEN_HASH, USER_HASH} from "./Constants";

const history = createBrowserHistory();

class Auth {
    login = (token = '') => {
        window.localStorage.setItem(TOKEN_HASH, token);
    }
    setUser = (user) => {
        window.localStorage.setItem(USER_HASH, JSON.stringify(user));
        window.user = user
    }

    logout = () => {
        showLoading()
        window.localStorage.clear();
        history.replace('/');
        setAppState({isLoggedIn: false})
        showSuccess('Successfully Logged out')
        hideLoading()
        window.location.reload();
    }

    isAuthenticated = () => !isNull(window.localStorage.getItem(TOKEN_HASH));
    getStoredToken = () => window.localStorage[TOKEN_HASH];
    getStoredUser = () => JSON.parse(window.localStorage.getItem(USER_HASH));
}
const authHandlerInstance = new Auth();

// Export the instance as default
export default authHandlerInstance;
