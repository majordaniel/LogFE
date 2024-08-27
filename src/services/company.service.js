import Request from "../utils/Request";
import {getUser, hideLoading, setAppState, setUser, showLoading, USER_TYPE_HASH,} from "../utils/Constants";
import {catchAuthError, showError} from "../utils";

class CompanyAuthService {
    companyId = getUser()?.company_id;
    phone = getUser()?.phone;
    type = localStorage.getItem(USER_TYPE_HASH) === "company" ? "company" : "admin";
    subUrl = "auth/company/";
    profile = () => Request().get(`${this.subUrl}authenticated`);
    update = (form_data) => Request().post(`${this.subUrl}profile`, form_data);
    updatePassword = (form_data) =>
        Request().post(`${this.subUrl}password/change`, form_data);
    forgotPassword = (form_data) =>
        Request().post(`${this.subUrl}password/forgot`, form_data);
    resetPassword = (form_data) =>
        Request().post(`${this.subUrl}password/reset`, form_data);
    otpVerification = (form_data) =>
        Request().post(`${this.subUrl}verify`, form_data);
    resendOtp = (form_data) => Request().post(`/auth/user/resend/otp`, form_data);
    login = (form_data) => Request().post(`${this.subUrl}login`, form_data);

    listTrips = (page = 1, perPage = 10) => {
        const id = this.companyId;
        return Request().get(
            `ride/trip/company/${id}?perPage=${perPage}&page=${page}`
        );
    };
    listUsers = () => Request().get("auth/company/users");

    listCompanyRiders = () => Request().get(`auth/company/riders`);

    fetchAllCompanyData = () => {
        showLoading();
        this.profile()
            .then((res) => {
                if (res) {
                    setUser(res.data.data, "company");
                    this.companyId = res?.data?.data?.company_id;
                    this.listCompanyRiders()
                        .then(({data: {data}}) => {
                            // console.log(data);
                            setAppState({riders: data || []});
                        })
                        .catch(catchAuthError)
                        .finally(hideLoading);
                    this.listUsers().then(({data: {data: {users}}}) => {
                        setAppState({users, admins: users || []})
                    }).catch(() => {});
                    this.listTrips()
                        .then(({data}) =>
                            setAppState({trips: data?.data?.trips || []})
                        )
                        .catch(catchAuthError)
                        .finally(hideLoading);
                }
            })
            .catch((err) => {
                setAppState({showOtpModal: err.response.status === 400});
                showError(err?.message);
            });
    };

    addRider = (form_data) =>
        Request().post(`auth/company/onboard/rider`, form_data);
}
const companyAuthServiceInstance = new CompanyAuthService();

// Export the instance as default
export default companyAuthServiceInstance;
