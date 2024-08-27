import {AppService, AuthService, CompanyAuthService} from "../services";
import React, {createContext, useEffect, useMemo, useReducer} from "react";
import {
    TOKEN_HASH,
    USER_HASH,
    USER_TYPE_HASH,
    hideLoading,
    setAppState,
    setDispatch,
    setToken,
    setUser,
} from "../utils/Constants";
import {catchAuthError, showError} from "../utils";

import PropTypes from "prop-types";

export const AppContext = createContext();
export const DEFAULT_STATE = {
    isLoggedIn: false,
    isLoading: false,
    //customers
    openCustomerProfile: false,
    selectedCustomer: {
        name: "",
        address: "",
        phone: "",
    },
    assign: false,
    openCustomerModal: false,
    //alert
    alert: {
        showAlert: false,
        type: "error",
        message: "error",
    },

    user: {email: ""},
    loggedInUser: {
        email: "",
    },
    selectedCompany: {
        name: "",
        address: "",
        phone: "",
        admin_password: "",
        admin_first_name: "",
        admin_last_name: "",
        admin_phone: "",
        // admin_email: "",
    },
    selectedRider: {
        firstName: "",
        lastName: "",
        phone: "",
        password: "",
        email: "",
        vehicle_id: "",
    },
    selectedAdmin: {
        firstName: "",
        lastName: "",
        phone: "",
        password: "",
        email: "",
    },
    openCompanyProfile: false,
    openEditCompany: false,
    openEditRider: false,
    openEditAdmin: false,
    editMode: false,

    companies: [],
    users: [],
    admins: [],
    trips: [],
    riders: [],

    showTripDetails: false,
    tripDetails: {},
    userType: "company",
    carriers: [],
    showTripInformation: false,
    tripInformation: {},
    map: {lat: "", lng: ""},
    showMapLocation: false,
    showOtpModal: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "STATE_CHANGE": {
            return {...state, ...action.payload};
        }
        default:
            return DEFAULT_STATE;
    }
};
const AppProvider = ({children}) => {
    const checkLoginState = () => {
        const user = JSON.parse(localStorage.getItem(USER_HASH));
        const token = localStorage.getItem(TOKEN_HASH);
        let userType = "company";
        const type = localStorage.getItem(USER_TYPE_HASH);
        if (type) userType = type;
        if (token) {
            setUser(user, userType);
            setToken(token);
            if (userType === "admin") {
                AuthService.profile()
                    .then((res) => {
                        if (res) setUser(res.data.data.user);
                    })
                    .catch(catchAuthError);
            } else {
                CompanyAuthService.profile()
                    .then((res) => {
                        if (res) setUser(res.data.data, userType);
                    })
                    .catch((err) => {
                        setAppState({showOtpModal: err.response.status === 400});
                        showError(err?.message);
                        hideLoading();
                    });
            }
            AppService.getVehicleType()
                .then(({data: {data}}) => setAppState({carriers: data}))
                .catch(() => {
                });
        }
    };
    const [app, dispatch] = useReducer(reducer, DEFAULT_STATE);
    const contextValue = useMemo(() => ({app, dispatch}), [app, dispatch]);
    setDispatch(contextValue.dispatch);
    useEffect(() => {
        checkLoginState();
        // eslint-disable-next-line
    }, []);
    return (
        <AppContext.Provider value={{...contextValue.app}}>
            {children}
        </AppContext.Provider>
    );
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppProvider;
