import "./styles.scss";

import {AppContext, DEFAULT_STATE} from "../../context/AppContext";
import {Drawer, Select} from "antd";
import React, {useContext, useState} from "react";

import CloseButton from "../closeBotton/closeBotton";
import CreateTaskForm from "../createCompany";
import DashboardMap from "../../pages/dashboard/home/dashboardMap/dashboardMap";
import GeneralButton from "../generalButton/AcceptButton";
import {setAppState} from "../../utils/Constants";

const CreateCompanyButton = () => {
    const {Option} = Select;
    const {openEditCompany} = useContext(AppContext)
    const toggleCreateTaskDrawer = () => setAppState({openEditCompany: !openEditCompany, editMode: false, selectedCompany: DEFAULT_STATE.selectedCompany});

    let [modal, setModal] = useState(false);
    const closeModal = e => {
        if (e.target === e.currentTarget) {
            setModal(false);
        }
    };
 

    return (
        <div className="create-task-wrapper">

            {/* Bulk import modal*/}
            {modal && (
                <React.Fragment>
                    <div style={{
                        position: "absolute",
                        left: "0",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <div className="backdrop" onClick={closeModal}></div>
                        <div className="modal">
                            <div className="modal-header">
                                <h1>Create via CSV</h1>
                                <a href="/">Download Sample File</a>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label> Select Item</label>
                                    <Select
                                        showSearch
                                        style={{width: "100%"}}
                                        placeholder="Search to Select"
                                        optionFilterProp="children"
                                    >
                                        <Option value="1">Not Identified</Option>
                                        <Option value="2">Closed</Option>
                                        <Option value="3">Communicated</Option>
                                        <Option value="4">Identified</Option>
                                        <Option value="5">Resolved</Option>
                                        <Option value="6">Cancelled</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )}

            <Drawer
                title=""
                placement="left"
                // closable={false}
                width={"100%"}
                className="create-task-drawer"
                bodyStyle={{backgroundColor: "#f6f6f6", height: "100%"}}
                maskClosable={false}
                onClose={toggleCreateTaskDrawer}
                closable={false}
                visible={openEditCompany}
                // style={{height: '100%'}}
                key="Left"
            >
                <div className="create-task">
                    <div className="task">
                        <div className="task-heading">
                            <div className="task-title"> New Logistics Company</div>
                            <div className="close-tab-btn" onClick={toggleCreateTaskDrawer}>
                                <CloseButton/>
                            </div>
                        </div>

                        <div style={{overflowY: "hidden", position: "relative", height: "100%"}}>
                            <div className="task-content">
                                <CreateTaskForm/>
                            </div>
                        </div>

                        <div className="task-footer">
                            {/*<button className="assign-task-btn" onClick={() => toogleAssignTaskDrawer()}>*/}
                            {/*    <img src="/logo.png" alt="" height={32} width={32}/>*/}
                            {/*    <span> Assign Task</span>*/}
                            {/*    <span className={`material-icons ${assignTaskDrawer ? "caret-rotate" : ""}`}>*/}
                            {/*        arrow_drop_down*/}
                            {/*    </span>*/}
                            {/*</button>*/}
                            <GeneralButton buttonClick={() => {
                                document.getElementById('submit-company-btn').click()
                            }} buttonText="Add Logistics Company"/>
                        </div>
                    </div>

                    <div className="map">
                        <DashboardMap/>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default CreateCompanyButton;
