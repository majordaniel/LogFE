import "./styles.scss";

import {Route, Switch} from "react-router-dom";
import React, {useState} from "react";
import SettingsSideNav from "../../../components/settingsSidenav/settingsSidenav";
import {settingsRoute} from "./settingsRoutes";

const Settings = () => {
    const [mobileSettingsSideNav, setMobileSettingsSideNav] = useState(false);
    return (
        <div className="settings">
            <div className="settings-side-nav large">
                <SettingsSideNav/>
            </div>

            {mobileSettingsSideNav && (
                <div className="settings-side-nav mobile">
          <span
              className="material-icons arrow-icon-left"
              onClick={() => setMobileSettingsSideNav(false)}
          >
            chevron_left
          </span>
                    <SettingsSideNav/>
                </div>
            )}

            <div className="settings-content">
                <div className="second-top-nav">
          <span
              className="material-icons arrow-icon-right"
              onClick={() => setMobileSettingsSideNav(true)}
          >
            chevron_right
          </span>
                </div>
                <Switch>
                    {settingsRoute?.map(settingsRoute => (
                        <Route
                            exact={settingsRoute.exact}
                            path={settingsRoute.path}
                            key={settingsRoute.path}
                            component={settingsRoute.component}
                        />
                    ))}
                </Switch>
            </div>
        </div>
    );
};

export default Settings;
