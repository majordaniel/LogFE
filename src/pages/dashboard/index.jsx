import "./styles.scss";
import Header from "../../components/dashboardHeader/dashboardHeader";
import {Redirect, Route, Switch} from "react-router-dom";
import routes from "./routes";
import React, {useContext} from "react";
import {_404,} from "../../components/common";
import CustomerProfile from "../../components/customerProfile";
import CompanyProfile from "../../components/companyProfile";
import {AppContext} from "../../context/AppContext";
import companyRoutes from "../company/companyRoutes";
import CompanyHeader from "../../components/dashboardHeader/companyHeader";
import TripUpdateModal from "../../components/TripUpdateModal";

const Dashboard = () => {
    const {userType} = useContext(AppContext)
    const openRoutes = userType === 'admin' ? routes : companyRoutes;
    return (
        <React.Fragment>
            {userType === 'admin' ? <Header/> : <CompanyHeader/>}
            <Switch>
                {openRoutes?.map(route => <Route exact={route.exact} path={route.path} key={route.path}
                                                 component={route.component}/>)}
                <Route path="*" component={_404}/>
                <Redirect to="/dashboard"/>
            </Switch>
            <CustomerProfile/>
            <CompanyProfile/>
            <TripUpdateModal/>
        </React.Fragment>
    );
};

export default Dashboard;

