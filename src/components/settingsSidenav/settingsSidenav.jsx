import "./styles.scss";
import SettingsLink from "./settingsSideNavLink";
import {settingsRoute} from "../../pages/dashboard/settings/settingsRoutes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSlidersH} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {Link} from "react-router-dom";
import AuthenticationHandler from "../../utils/AuthenticationHandler";

const SettingsSideNav = () => {
  return (
    <ul className="settings-sidenav">
      <h3 className="heading">
        <FontAwesomeIcon icon={faSlidersH} className="icon" /> Settings
      </h3>

      {settingsRoute?.map((route, index) => (
        <React.Fragment key={route.path}>
          <li>
            <SettingsLink route={route} />
          </li>
          {index === 1 || index === 4 || index === 10 ? (
            <li className="divider"></li>
          ) : (
            ""
          )}
        </React.Fragment>
      ))}
      <li>
        <Link to={""} onClick={() => {
            AuthenticationHandler.logout()
        }}>
          <div className="nav-link">Logout</div>
        </Link>
      </li>
    </ul>
  );
};

export default SettingsSideNav;
