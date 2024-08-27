import React from 'react';
import auth from './AuthenticationHandler';
import {notifier} from './Constants';

export const Auth = auth;
export const isNull = (value) => (value === null || value === undefined || value === '' || value === 'null');

export const Naira = '₦';

export const catchAuthError = (error) => {
    if (error.response) {
        const { status, message } = error.response;
        if (status === 401) {
            // auth.logout();
            // window.user = null;
            return showError('ERROR: Session Expired')
        }
        if (status === 404) {
            return showError(message || 'ERROR: Route not found')
        }
        if (status === 402) {
            return showError(message || 'ERROR: Something went wrong')
        }
        return catchError(error)
    }
    return showError(error.message)
}

export const catchError = (error) => {
    if (error.response) {
        // console.log(error.response)
        const data = error.response.data;
        if (data.errors && Array.isArray(data.errors)) {
            data.errors?.forEach(err => showError(err));
            return
        }
        if (data.error) {
            return showError(data.error)
        }
        if (data.message) {
            return showError(data.message)
        }
    }
    showError(error.message)
}

export const showSuccess = (msg) => notifier('success', msg)
export const showError = (msg) => notifier('error', msg)
export const showInfo = (msg) => notifier('info', msg)

export const convertToSlug = (string) => {
    return string
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[-]+/g, "-")
        .replace(/[^\w-]+/g, "");
};

export const isDeepEqual = (obj1, obj2) => {
    const obj1Str = JSON.stringify(obj1);
    const obj2Str = JSON.stringify(obj2);

    return obj1Str === obj2Str;
};

export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};
 
export const formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (
            negativeSign +
            (j ? i.substr(0, j) + thousands : "") +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount
                ? decimal +
                Math.abs(amount - i)
                    .toFixed(decimalCount)
                    .slice(2)
                : "")
        );
    } catch (e) {
    }
};
export const setUserType = t => window.localStorage.type = t; 

export const data = { data: [], meta: { current_page: 1, last_page: 1, total: 1, per_page: 12, from: 1, to: 2 } }


export function checkAll(ev, checkbox, value) {
    const checkboxArr = ev.target.checked ? value : new Array(12).fill(ev.target.checked);
    this.setState({ [checkbox]: checkboxArr, checkboxAll: ev.target.checked });
}

export function changeCheck(ev, checkbox, id, value = true) {
    this.state[checkbox][id] = ev.target.checked ? value : false;
    this.setState({ [checkbox]: this.state[checkbox] });
}


export function StarRating({ count }) {
    return <div className="rating">
        <i className={`fa fa-star ${count > 0 && 'filled'}  `} />
        <i className={`fa fa-star ${count > 1 && 'filled'}  `} />
        <i className={`fa fa-star ${count > 2 && 'filled'}  `} />
        <i className={`fa fa-star ${count > 3 && 'filled'}  `} />
        <i className={`fa fa-star ${count > 4 && 'filled'}  `} />
    </div>;
}

export const arrayWrap = element => {
    return Array.isArray(element) ? element : [element]
}