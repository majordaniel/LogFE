import Auth from './AuthenticationHandler'
import axios from 'axios/index'

// const baseURL = 'https://api.izigo.ng/api/v1/';
const baseURL = ' http://127.0.0.1:8000/api/v1/';


/**
 * Configure axios to automatically add baseUrl and authorization to needed api request
 */
function Request() {
    let token = window.token = Auth.getStoredToken()
    if (token) {
        const headers = {"x-access-token": token};
        return axios.create({baseURL, headers})
    }
    return axios.create({baseURL})
}

export default Request
// instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response) {
//             const {status, message} = error.response
//             if (status === 401) {
//                 auth.logout();
//                 window.user = null;
//                 showError('ERROR: Session Expired')
//             } else if (status === 404) {
//                 showError(message)
//             }
//         } else {
//             return Promise.reject(error);
//         }
//     }
// );