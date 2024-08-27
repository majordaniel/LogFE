import "./styles.scss";
import {NavLink} from "react-router-dom";

const SettingsSideNavLink = ({ route }) => {
  return (
    <NavLink activeClassName="is-active" exact={route.exact} to={route.path}>
      <div className="nav-link">{route.name}</div>
    </NavLink>
  );
};

export default SettingsSideNavLink;
