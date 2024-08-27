import React from "react";
import {ADMINS, CUSTOMERS, DASHBOARD, LOGISTICS, TRIPS,} from "../../routes";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCarSide, faDonate, faThLarge, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import {faChartBar} from "@fortawesome/free-regular-svg-icons";

import Dashboard from "./home/dashboard";
import Index from "./customers";
import Logistics from "./logistics";
import Admins from "./admins";
import Trips from "./trips";

const routes = [
    {
        name: "Dashboard",
        icon: <FontAwesomeIcon icon={faThLarge}/>,
        path: DASHBOARD,
        component: Dashboard,
        exact: true,
    },
    {
        name: "Trips",
        icon: <FontAwesomeIcon icon={faCarSide}/>,
        path: TRIPS,
        component: Trips,
        exact: true,
    },
    {
        name: "Customers",
        icon: <FontAwesomeIcon icon={faUserFriends}/>,
        path: CUSTOMERS,
        component: Index,
        exact: true,
    },
    {
        name: "Logistics",
        icon: <FontAwesomeIcon icon={faChartBar}/>,
        path: LOGISTICS,
        component: Logistics,
        exact: true,
    },
    {
        name: "Admins",
        icon: <FontAwesomeIcon icon={faDonate}/>,
        path: ADMINS,
        component: Admins,
        exact: true,
    },
];

export default routes;