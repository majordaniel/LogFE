import "./styles.scss";
import {Col, Row} from "antd";
import DashboardTask from "../../dashboard/home/dashboardTask/dashboardTask";
import DashboardMap from "./dashboardMap/dashboardMap";
import React, {useContext, useEffect, useState} from "react";
import TabsComponent from "../../../components/Tabs/tabs";
import DashboardDelegates from "./dashboardDelegates/dashboardDelegates";
import {CompanyAuthService} from "../../../services";
import {AnalyticsCard} from "../../../components/common";
import {formatMoney, Naira} from "../../../utils";
import {AppContext} from "../../../context/AppContext";

const CompanyPortal = () => {
    const { riders, admins, trips} = useContext(AppContext)

    let [collapseTask, setCollapseTask] = useState(false);
    let [collapseDelegate, setCollapseDelegate] = useState(false);
    let [collapseDash, setCollapseDash] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        CompanyAuthService.fetchAllCompanyData()
    }, [])

    const dashboardMobile = [
        {
            tabName: "REQUESTS",
            tabContent: <DashboardTask/>,
            tabValue: null,
            tabIndex: 1,
        },
        {
            tabName: "MAP",
            tabContent: <DashboardMap/>,
            tabValue: null,
            tabIndex: 2,
        },
        {
            tabName: "DELEGATES",
            tabContent: <DashboardDelegates/>,
            tabValue: null,
            tabIndex: 3
        }
    ];

    return (
        <React.Fragment>
            <div className="dashboard dashboard-large-screen">
                <Row>
                    <Col md={9} lg={7} className={`dashboard-task-wrapper ${collapseTask ? "collapse" : ""}`}>
                        <DashboardTask/>
                    </Col>

                    <Col flex="auto" className="dashboard-map-wrapper">
                        <div
                            className="collapse-sidebar"
                            onClick={() => setCollapseTask(!collapseTask)}
                        >
                            <span
                                className="material-icons">{!collapseTask ? 'keyboard_arrow_left' : 'keyboard_arrow_right'}</span>
                        </div>
                        <div className={`analytics-map  ${collapseDash ? "hide-map" : "show-map"} `}>
                            <div className="dashboard-analytics-map">
                                <DashboardMap/>
                            </div>
                            <div className={`dashboard-analytics`}>
                                <div className="collapse-sidebar top"
                                     onClick={() => setCollapseDash(!collapseDash)}>
                                    <span className="material-icons">
                                        {!collapseDash ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</span>
                                </div>
                                <div className="p-3">
                                    <h1>Dashboard</h1>
                                    <div className="row mt-4">
                                        <AnalyticsCard title={"Trips"} value={trips?.length || 0}/>
                                        <AnalyticsCard title={"Admin Users"} value={admins.length || 0}/>
                                        <AnalyticsCard title={"Total No. Riders"} value={riders.length || 0}/>
                                        <AnalyticsCard title={"Transactions"} value={Naira + formatMoney(0)}/>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="collapse-sidebar right" onClick={() => setCollapseDelegate(!collapseDelegate)}>
                            <span
                                className="material-icons">{collapseDelegate ? 'keyboard_arrow_left' : 'keyboard_arrow_right'}</span>
                        </div>
                    </Col>

                    <Col md={9} lg={7} className={`dashboard-delegates-wrapper ${collapseDelegate ? "collapse" : ""}`}>
                        <DashboardDelegates/>
                    </Col>
                </Row>
            </div>
            <div className="dashboard dashboard-mobile">
                <TabsComponent tabItems={dashboardMobile} activeTabKey="1"/>
            </div>
        </React.Fragment>
    );
};

export default CompanyPortal;
