import {Modal} from "antd";
import {useContext} from "react";
import {AppContext} from "../context/AppContext";
import {Formik} from "formik";
import * as Yup from "yup";
import {hideLoading, setAppState, showLoading} from "../utils/Constants";
import {CompanyAuthService} from "../services";
import {catchAuthError, showSuccess} from "../utils";
import {FormField} from "../widget/FormElements";

const Otpverification = () => {
  const { showOtpModal } = useContext(AppContext);

  return (
    <Modal
      onCancel={() =>
        setAppState({
          showOtpModal: false,
        })
      }
      footer={false}
      closable={false}
      visible={showOtpModal}
      destroyOnClose={true}
      className=""
    >
      <Formik
        initialValues={{ code: "" }}
        validationSchema={Yup.object().shape({
          code: Yup.number()
            .min(4, "OTP cannot be less than five numbers")
            .required("OTP is required"),
        })}
        onSubmit={(values, action) => {
          showLoading();
          CompanyAuthService.otpVerification(values)
            .then(() => {
              showSuccess("Verification successfull");
              setAppState({
                showOtpModal: false,
              });

              action.resetForm();
            })
            .catch(catchAuthError)
            .finally(hideLoading);
        }}
      >
        {({ values, errors, touched, setFieldValue, ...props }) => (
          <form onSubmit={props.handleSubmit}>
            <p className="fs-14">Verify your account</p>
            <div className="row">
              <div className="col-md-12">
                <FormField
                  type="text"
                  name="code"
                  placeholder="OTP"
                  // title="Enter OTP"
                />
              </div>
            </div>

            <div className="spaced mt-2">
              <button
                type="submit"
                className="btn btn-sm fs-12 ff-700 fw-700 btn-round btn-success"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => {
                  showLoading();
                  CompanyAuthService.resendOtp()
                    .then(({ data: { message } }) => {
                      showSuccess(message);
                    })
                    .catch(catchAuthError)
                    .finally(hideLoading);
                }}
                className="btn fs-12 ff-700 fw-700 btn-transparent"
              >
                Resend Otp
              </button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default Otpverification;
