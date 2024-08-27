import "./styles.scss";

import React, {useContext} from "react";
import {Drawer} from "antd";
import {AppContext, DEFAULT_STATE} from "../../../context/AppContext";
import {setAppState} from "../../../utils/Constants";
import {GrClose} from "react-icons/all";

import GeneralButton from "../../../components/generalButton/AcceptButton";
import Map from "../home/dashboardMap/dashboardMap";

const TripDetail = () => {
    const {openTrip, selectedTrip} = useContext(AppContext);
    const openToggle = () =>
        setAppState({
            openTrip: !openTrip,
            selectedTrip: DEFAULT_STATE.selectedTrip,
            editMode: false,
        });
    return (
        <div className="create-task-wrapper">
            <Drawer
                title=""
                placement="left"
                width={"100%"}
                className="create-task-drawer"
                bodyStyle={{backgroundColor: "#f6f6f6", height: "100%"}}
                maskClosable={true}
                onClose={openToggle}
                closable={true}
                visible={openTrip}
                key="Left"
            >
                <div className="create-task">
                    <div className="task">
                        <div className="task-heading">
                            <div className="task-title"> New Rider</div>
                            <div className="close-tab-btn" onClick={openToggle}>
                                <GrClose/>
                            </div>
                        </div>

                        <div
                            style={{
                                overflowY: "hidden",
                                position: "relative",
                                height: "100%",
                            }}
                        >
                            <div className="task-content"></div>
                        </div>

                        <div className="task-footer">
                            <GeneralButton
                                buttonClick={() =>
                                    document.getElementById("submit-company-btn").click()
                                }
                                buttonText="Add Rider"
                            />
                        </div>
                    </div>
                    <div className="map">
                        <Map/>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};
export default TripDetail;
