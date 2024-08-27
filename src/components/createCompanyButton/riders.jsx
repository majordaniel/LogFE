import "./styles.scss";

import * as Yup from "yup";

import {AppContext, DEFAULT_STATE} from "../../context/AppContext";
import React, {useContext, useEffect, useState} from "react";
import {catchAuthError, showSuccess} from "../../utils";
import {hideLoading, setAppState, showLoading} from "../../utils/Constants";

import CloseButton from "../closeBotton/closeBotton";
import {AppService} from "../../services";
import {DASHBOARD} from "../../routes";
import DashboardMap from "../../pages/dashboard/home/dashboardMap/dashboardMap";
import {Drawer} from "antd";
import {FormElements, FormField} from "../../widget/FormElements";
import {Formik} from "formik";
import GeneralButton from "../generalButton/AcceptButton";
import {useHistory} from "react-router-dom";

const CreateRider = () => {
    const {selectedRider, carriers, editMode} = useContext(AppContext);
    const [showPassword, setShowPassword] = useState(false);
    const {push} = useHistory();

    useEffect(() => {
        AppService.getVehicleType()
            .then(({data: {data}}) => setAppState({carriers: data}))
            .catch(() => {
            });
    }, []);
    return (
        <Formik
            initialValues={selectedRider}
            validationSchema={Yup.object().shape({
                firstName: Yup.string().required("First Name Field cannot be empty"),
                lastName: Yup.string().required("Last Name Field cannot be empty"),
                email: Yup.string()
                    .email("Must be a valid email")
                    .required("Email is required"),
                password: editMode ? Yup.string() : Yup.string().min(6).required("Password is required"),
                password_confirm: editMode ? Yup.string() : Yup.string().oneOf(
                    [Yup.ref("password"), null],
                    "Passwords must match"
                ),
                phone: Yup.string()
                    .min(11)
                    .matches(
                        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
                        "Phone number is not valid"
                    ),
                vehicle_id: Yup.string().required(
                    "At least a vehicle type is required"
                ),
            })}
            onSubmit={(values, action) => {
                showLoading();
                delete values.password_confirm;
                const {email, firstName, lastName} = values
                const service = editMode ? AppService.updateRider(selectedRider.id, {
                    email, firstName, lastName
                }) : AppService.addRider(values)

                service.then(() => {
                    showSuccess(editMode ? 'Updated Successfully' : "Created Successfully");
                    setAppState({
                        openEditRider: false,
                        selectedRider: DEFAULT_STATE.selectedRider,
                        editMode: false,
                    });
                    push(DASHBOARD);
                    action.resetForm();
                    if (editMode) AppService.fetchAllData();
                }).catch(catchAuthError).finally(hideLoading);
            }}
        >
            {({values, errors, touched, setFieldValue, ...props}) => (
                <form className="create-task-form" onSubmit={props.handleSubmit}>
                    <p className="fs-14">Please provide all necessary information.</p>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-row">
                                <div className="form-col w-100">
                                    <FormField
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                    />
                                </div>
                                <span className="material-icons input-icon">person</span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-row">
                                <div className="form-col w-100">
                                    <FormField
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                    />
                                </div>
                                <span className="material-icons input-icon">person</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-row">
                                <div className="form-col w-100 phone-number">
                                    <FormField
                                        type="text"
                                        name="phone"
                                        pattern="\d*"
                                        maxLength={11}
                                        max={11} disabled={editMode}
                                        placeholder="81********"
                                    />
                                </div>
                                <span className="material-icons input-icon">phone</span>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-row">
                                <div className="form-col w-100">
                                    <FormField type="email" name="email" placeholder="Email"/>
                                    <span className="material-icons input-icon">mail</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-grow-1 mt-3">
                        {carriers?.map((car) => (
                            <div
                                onClick={() => {
                                    setFieldValue("vehicle_id", car.id);
                                }}
                                className={`carrier-type ${
                                    values.vehicle_id === car.id && "selected"
                                }`}
                                key={car.id}
                            >
                                <img alt={car.id} src={car.imageUrl}/>
                                <p>
                                    {car.name}
                                    {/*{values.vehicle_id === car.id && <BiBadgeCheck/>}*/}
                                </p>
                            </div>
                        ))}
                    </div>
                    {errors.vehicle_id && <FormElements message={errors.vehicle_id}/>}

                    {!editMode && <>
                        <p className="mt-4">Setup Password</p>

                        <div className="row">
                            <div className="form-col col-md-6">
                                <div className="form-row">
                                    <div className="form-col w-100">
                                        <FormField
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            autoComplete="new-password"
                                            placeholder="Password"
                                        />
                                        <span className="material-icons input-icon">lock</span>
                                        <span
                                            className="material-icons logi-lati"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                    {!showPassword ? "visibility" : "visibility_off"}
                  </span>
                                    </div>
                                </div>
                            </div>

                            <div className="form-col col-md-6">
                                <div className="form-row">
                                    <div className="form-col w-100">
                                        <FormField
                                            type={showPassword ? "text" : "password"}
                                            name="password_confirm"
                                            autoComplete="new-password"
                                            placeholder="Password Confirmation"
                                        />
                                        <span className="material-icons input-icon">lock</span>
                                        <span
                                            className="material-icons logi-lati"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                    {!showPassword ? "visibility" : "visibility_off"}
                  </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}
                    <button
                        type="submit"
                        hidden
                        id="submit-company-btn"
                        className="btn btn-md fs-12 mt-2 ff-700 fw-700  btn-round btn-success"
                    >
                        hidden submit
                    </button>
                </form>
            )}
        </Formik>
    );
};
const CreateRidersButton = () => {
    const {openEditRider, editMode} = useContext(AppContext);
    const toggleCreateTaskDrawer = () =>
        setAppState({
            openEditRider: !openEditRider,
            selectedRider: DEFAULT_STATE.selectedRider,
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
                maskClosable={false}
                onClose={toggleCreateTaskDrawer}
                closable={false}
                visible={openEditRider}
                key="Left"
            >
                <div className="create-task">
                    <div className="task">
                        <div className="task-heading">
                            <div className="task-title"> {editMode ? 'Update' : 'New'} Rider</div>
                            <div className="close-tab-btn" onClick={toggleCreateTaskDrawer}>
                                <CloseButton/>
                            </div>
                        </div>

                        <div
                            style={{
                                overflowY: "hidden",
                                position: "relative",
                                height: "100%",
                            }}
                        >
                            <div className="task-content">
                                <CreateRider/>
                            </div>
                        </div>

                        <div className="task-footer">
                            <GeneralButton
                                buttonClick={() =>
                                    document.getElementById("submit-company-btn").click()
                                }
                                buttonText={editMode ? "Edit Rider" : "Add Rider"}
                            />
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
export default CreateRidersButton;
