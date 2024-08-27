import {NavLink} from 'react-router-dom'

const SideNavLink = ({ route }) => {
  return (
    <NavLink activeClassName='is-active' exact={route.exact} to={route.path}  >
      <div className="nav-link">
        {route.icon}
        {route.name}
      </div>
    </NavLink>
    
   );
}
 
export default SideNavLink;