import React from "react";
import {ADMINS, DASHBOARD, TRIPS} from "../../routes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCarSide, faDonate, faThLarge,} from "@fortawesome/free-solid-svg-icons";
import CompanyPortal from "./portal";
import Trips from "../dashboard/trips";
import Admins from "../dashboard/admins";

const companyRoutes = [
  {
    name: "Dashboard",
    icon: <FontAwesomeIcon icon={faThLarge} />,
    path: DASHBOARD,
    component: CompanyPortal,
    exact: true,
  },
  //   {
  //     name: "Trips",
  //     icon: <FontAwesomeIcon icon={faCarSide} />,
  //     path: TRIPS,
  //     component: Trips,
  //     exact: true,
  //   },
  {
    name: "Trips",
    icon: <FontAwesomeIcon icon={faCarSide} />,
    path: TRIPS,
    component: Trips,
    exact: true,
  },
  {
    name: "Company Admins",
    icon: <FontAwesomeIcon icon={faDonate} />,
    path: ADMINS,
    component: Admins,
    exact: true,
  },
];
export default companyRoutes;
