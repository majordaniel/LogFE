import Request from "../utils/Request";

class AuthService {
    subUrl = 'auth/admin/'
    profile = () => Request().get(`${this.subUrl}authenticated`);
    update = (form_data) => Request().post(`${this.subUrl}profile`, form_data);
    updatePassword = (form_data) => Request().post(`${this.subUrl}password/change`, form_data);
    forgotPassword = (form_data) => Request().post(`${this.subUrl}password/forgot`, form_data);
    resetPassword = (form_data) => Request().post(`${this.subUrl}password/reset`, form_data);
    login = (form_data) => Request().post(`${this.subUrl}login`, form_data);
}

const authServiceInstance = new AuthService();

// Export the instance as default
export default authServiceInstance;
// export default new AuthService();


