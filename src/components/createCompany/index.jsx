import "./styles.scss";

import * as Yup from "yup";

import {AppContext, DEFAULT_STATE} from "../../context/AppContext";
import {catchAuthError, showSuccess} from "../../utils";
import {hideLoading, setAppState, showLoading} from "../../utils/Constants";
import {useContext, useState} from "react";

import {AppService} from "../../services";
import {FormField} from "../../widget/FormElements";
import {Formik} from "formik";
import {LOGISTICS} from "../../routes";
import {useHistory} from "react-router-dom";

const CreateCompany = () => {
  const { selectedCompany } = useContext(AppContext);
  const [showLongitude, setShowLongitude] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [avatar, setAvatar] = useState({})
  const { push } = useHistory();
  // const processSubmit = (e) => {
  //     e.preventDefault();
  //     const form = new FormData(e.target);
  // };
  //
  // const onSelectAvatar = (e) => {
  //     if (e.target.files && e.target.files[0]) {
  //         document.getElementById('avatar_pic').src
  //             = window.URL.createObjectURL(e.target.files[0]);
  //         setAvatar(e.target.files[0]);
  //     }
  //     // toast.warning('A file must be attached');
  // };

  return (
    <Formik
      initialValues={selectedCompany}
      // enableReinitialize
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Company Name Field cannot be empty"),
        admin_first_name: Yup.string().required(
          "First Name Field cannot be empty"
        ),
        admin_last_name: Yup.string().required(
          "Last Name Field cannot be empty"
        ),
        admin_phone: Yup.string()
          .min(11)
          .matches(
            /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
            "Phone number is not valid"
          ),
        admin_password: Yup.string().required("Password Field cannot be empty"),
        address: Yup.string().required("Address is required"),
        email: Yup.string().email().required("Address is required"),
        // phone: Yup.number().required("Phone number required"),
        phone: Yup.string()
          .min(11)
          .matches(
            /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
            "Phone number is not valid"
          ),
        // email: Yup.string().email().required('Email field is required'),
      })}
      onSubmit={(values, action) => {
        showLoading();
        // values.phone = `234${values.phone}`;
        // values.admin_phone = `234${values.admin_phone}`;
        AppService.createCompany(values)
          .then(() => {
            showSuccess("Created Successfully");
            setAppState({
              openEditCompany: false, editMode: false,
              selectedCompany: DEFAULT_STATE.selectedCompany,
            });
            push(LOGISTICS);
          })
          .catch(catchAuthError)
          .finally(hideLoading);
      }}
    >
      {(props) => (
        <form className="create-task-form" onSubmit={props.handleSubmit}>
          <p className="fs-14">Please provide all necessary information.</p>
          <div className="form-row col-sm-8">
            <div className="form-col w-100">
              <FormField
                type="text"
                name="name"
                placeholder="Logistics Company"
              />
            </div>
            <span className="material-icons input-icon">person</span>
          </div>
          <div className="row">
            <div className="col-sm-8">
              <div className="form-row">
                <div className="form-col w-100 phone-number">
                  <FormField
                    type="text"
                    name="phone"
                    // onInput={function (element) {
                    //   const regex = /[^0-9]/gi;
                    //   if (element.target.value)
                    //     element.target.value = element.target.value.replace(
                    //       regex,
                    //       ""
                    //     );
                    // }}
                    pattern="\d*"
                    maxLength={11}
                    max={11}
                    placeholder="81********"
                  />
                  {/* <select className="country-code">
                                        <option value="">+234</option>
                                    </select> */}
                </div>
                <span className="material-icons input-icon">phone</span>
              </div>
            </div>

            {/*<div className="col-md-6">*/}
            {/*    <div className="form-row">*/}
            {/*        <div className="form-col w-100">*/}
            {/*            <FormField type="email" name="email" placeholder="Email"/>*/}
            {/*            <span className="material-icons input-icon">mail</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
          </div>

          <div className="form-row col-sm-8">
            <div className="form-col w-100">
              {/*<SearchLocation name="address" placeholder={'Address '}/>*/}
              <FormField type="text" name="address" placeholder={"Address "} />
            </div>
            <span className="material-icons input-icon">location_on</span>
            <span
              className="material-icons logi-lati"
              onClick={() => setShowLongitude(!showLongitude)}
            >
              language
            </span>
          </div>
          <p className="mt-3 mb-0">Setup Company Admin Profile</p>
          <hr className="mt-1 mb-3" />
          <div className="row">
            <div className="col-md-6">
              <div className="form-row">
                <div className="form-col w-100">
                  <FormField
                    type="text"
                    name="admin_first_name"
                    placeholder="Admin First Name"
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
                    name="admin_last_name"
                    placeholder="Admin Last Name"
                  />
                </div>
                <span className="material-icons input-icon">person</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-row">
                <div className="form-col w-100">
                  <FormField
                    type="text"
                    name="admin_phone"
                    // onInput={function (element) {
                    //   const regex = /[^0-9]/gi;
                    //   if (element.target.value)
                    //     element.target.value = element.target.value.replace(
                    //       regex,
                    //       ""
                    //     );
                    // }}
                    pattern="\d*"
                    maxLength={11}
                    max={11}
                    placeholder="81********"
                  />
                  {/* <select className="country-code">
                    <option value="">+234</option>
                  </select> */}
                </div>
                <span className="material-icons input-icon">phone</span>
              </div>
            </div>
            <div className="form-col col-md-6">
              <div className="form-row">
                <div className="form-col w-100">
                  <FormField
                    type={showPassword ? "text" : "password"}
                    name="admin_password"
                    placeholder="password"
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
                    // type={showPassword ? "text" : "password"}
                    name="email"
                    placeholder="Admin email"
                  />
                  <span className="material-icons input-icon">email</span>
                </div>
              </div>
            </div>
          </div>

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

export default CreateCompany;
