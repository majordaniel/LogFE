import "./styles.scss";

import {Drawer} from "antd";
import routes from "../../pages/dashboard/routes";
import SideNavLink from "./sideNavLink";
import {Link} from "react-router-dom";
import {DASHBOARD} from "../../routes.js";
import React, {useContext} from "react";
import AuthenticationHandler from "../../utils/AuthenticationHandler";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import companyRoutes from "../../pages/company/companyRoutes";
import {AppContext} from "../../context/AppContext";

const SideBar = ({ toggleSideNav, showSideNav }) => {
  const { userType } = useContext(AppContext);
  const openRoutes = userType === "admin" ? routes : companyRoutes;
  return (
    <Drawer
      title=""
      placement="left"
      closable={false}
      className="side-nav"
      bodyStyle={{ backgroundColor: "black", overflowY: "auto" }}
      onClose={toggleSideNav}
      visible={showSideNav}
      key="Left"
    >
      <div className="side-nav-header">
        <div className="menu-button">
          {/* <div />
          <div />
          <div /> */}
          <span className="material-icons " onClick={toggleSideNav}>
            close
          </span>
        </div>

        <div className="logo">
          <Link to={DASHBOARD}>
            <img src="/logo.png" width={30} alt="app-logo" />
            <span style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
              &nbsp;&nbsp;IZIGO ADMIN
            </span>
          </Link>
        </div>
      </div>

      <div className="side-nav-links">
        {openRoutes?.map((route) => (
          <div onClick={toggleSideNav} key={route.path}>
            <SideNavLink route={route} />
          </div>
        ))}

        <div
          onClick={() => {
            toggleSideNav();
            AuthenticationHandler.logout();
          }}
        >
          <SideNavLink
            route={{
              exact: true,
              path: "/",
              icon: <FontAwesomeIcon icon={faPowerOff} />,
              name: "Logout",
            }}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default SideBar;
