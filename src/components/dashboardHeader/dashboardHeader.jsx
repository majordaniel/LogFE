import "./styles.scss";

import {ADMINS, CUSTOMERS, DASHBOARD, LOGISTICS, TRIPS} from "../../routes";
import {Link, NavLink, useLocation} from "react-router-dom";
import React, {useState} from "react";

import CreateAdminUserButton from "../CreateAdminUserButton";
import CreateCompanyButton from "../createCompanyButton/";
import CreateRider from "../createCompanyButton/riders";
import {DEFAULT_STATE} from "../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SideBar from "../SideBar/side_bar";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {setAppState} from "../../utils/Constants";

const CreateCompanyNow = () => {
    const onClick = () => setAppState({
        openEditCompany: true, editMode: false, selectedCompany: DEFAULT_STATE.selectedCompany
    })
    return (
        <div className="customer-header">
            <span/>
            <div className="create-task-wrapper">
                <div className="create-task-button-large-screen">
                    <button onClick={onClick}>New Logistics</button>
                    <div className="btn-icon" onClick={onClick}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </div>
                </div>
                <div className="create-task-button-mobile">
                    <div className="material-icons" onClick={onClick}>
                        add
                    </div>
                </div>
            </div>
        </div>
    );
}
const HeaderNav = () => {
    let location = useLocation();
    if (location.pathname.includes(CUSTOMERS)) return <div className="customer-header"/>


    if (location.pathname.includes(LOGISTICS)) {
        return <CreateCompanyNow/>
    }
    if (location.pathname.includes(ADMINS)) {
        const onClick = () => setAppState({
            openEditCompany: true,
            selectedRider: DEFAULT_STATE.selectedRider,
            editMode: false
        })
        return (
            <div className="customer-header">
                <span/>
                <div className="create-task-wrapper">
                    <div className="create-task-button-large-screen">
                        <button onClick={onClick}>New Admin User</button>
                        <div className="btn-icon" onClick={onClick}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </div>
                    </div>
                    <div className="create-task-button-mobile">
                        <div className="material-icons" onClick={onClick}>
                            add
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <React.Fragment>
            <div className="filters">
                <div className="map-list">
                    <NavLink activeClassName="is-active" exact to={DASHBOARD}>
                        <i className="fa fa-map-o"/>
                        Maps
                    </NavLink>
                    <NavLink
                        activeClassName="is-active"
                        exact
                        to={TRIPS}
                        className="list"
                    >
                        <i className="fa fa-list-ul"/>
                        List
                    </NavLink>
                </div>
            </div>
            <div style={{alignSelf: "center", marginLeft: "auto"}}>
                <CreateCompanyNow/>
            </div>
        </React.Fragment>
    );
};

const Header = () => {
    const [showSideNav, setShowSideNav] = useState(false);
    const toggleSideNav = () => setShowSideNav(!showSideNav);

    return (
        <div className="header">
            <div className="menu-button" onClick={toggleSideNav}>
                <div/>
                <div/>
                <div/>
            </div>
            <div className="logo">
                <Link to={DASHBOARD}>
                    <img src="/logo.png" width={40} alt=""/>
                    <span
                        style={{
                            fontSize: 20,
                            marginRight: 20,
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >&nbsp;&nbsp;IZIGO ADMIN</span>
                </Link>
            </div>
            <HeaderNav/>
            {/* SIDE NAV DRAWER */}
            <SideBar toggleSideNav={toggleSideNav} showSideNav={showSideNav}/>
            <CreateCompanyButton/>
            <CreateAdminUserButton/>
            <CreateRider/>
        </div>
    );
};

export default Header;
