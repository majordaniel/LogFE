import {useHistory} from "react-router-dom";
import "./styles.scss";
import React, {useRef, useState} from "react";
import {COMPANY_DASHBOARD} from "../../routes";
import {CompanyAuthService} from "../../services";
import {catchError, showSuccess} from "../../utils";
// import {FaPhoneAlt, GiToken, RiLockPasswordLine, Si1Password,} from "react-icons/all";
import { FaPhoneAlt } from 'react-icons/fa';       // FontAwesome icons
import { GiToken } from 'react-icons/gi';         // Game Icons
import { RiLockPasswordLine } from 'react-icons/ri'; // Remix Icons
import { Si1Password } from 'react-icons/si';     // Simple Icons

import {hideLoading, setToken as setAppToken, setUser, showLoading,} from "../../utils/Constants";

const Login = () => {
  let { push } = useHistory();
  let [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState("login");

  const login = (e) => {
    e.preventDefault();
    showLoading();
    CompanyAuthService.login({
      phone,
      password,
    })
      .then(({ data }) => {
        showSuccess("Login Successfully");
        const {
          data: { token, user },
        } = data;
        setAppToken(token);
        setUser(user, "company");
        push(COMPANY_DASHBOARD);
      })
      .catch(catchError)
      .finally(hideLoading);
  };

  const forgot = (e) => {
    e.preventDefault();
    showLoading();
    CompanyAuthService.forgotPassword({ phone })
      .then(({ data: { message } }) => {
        showSuccess(message);
        setStep("change-password");
      })
      .catch(catchError)
      .finally(hideLoading);
  };
  const restPassword = (e) => {
    e.preventDefault();
    showLoading();
    CompanyAuthService.resetPassword({ password, token })
      .then(({ data: { message } }) => {
        showSuccess(message);
        setStep("login");
      })
      .catch(catchError)
      .finally(hideLoading);
  };

  let passwordRef = useRef();

  const toggleVisibility = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  };

  const showStep = () => {
    if (step === "change-password") {
      return (
        <div className="p-1 px-md-5">
          <div className="form-card centered column">
            <img src={"/logo.png"} className="logo" alt="" />
            <form className="form" onSubmit={(e) => restPassword(e)}>
              <p className="form-heading text-start">Update Password</p>
              <div className="email-input">
                <GiToken className="input-prepend" />
                <input
                  type="number"
                  name="token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Enter token"
                />
              </div>
              <div className="password-input">
                <Si1Password className="input-prepend" />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  ref={passwordRef}
                />
                <i className="fa fa-eye" onClick={toggleVisibility} />
              </div>
              <div className="password-input">
                <RiLockPasswordLine className="input-prepend" />
                <input
                  type={showPass ? "text" : "password"}
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
                <i
                  className="fa fa-eye"
                  onClick={() => setShowPass(!showPass)}
                />
              </div>

              <div className="d-flex spaced mb-3">
                <span
                  onClick={() => setStep("login")}
                  className="clickable text-info"
                >
                  Have an account? Log in
                </span>
                <button
                  onClick={forgot}
                  type="button"
                  className="btn btn-transparent p-0 shadow-none text-secondary"
                >
                  Resend Token
                </button>
              </div>

              <button type="submit" className="submit-btn">
                Reset
              </button>
            </form>
          </div>
        </div>
      );
    }

    if (step === "reset") {
      return (
        <div className="p-1 px-md-5">
          <div className="form-card centered column">
            {/*<img src={"/logo.png"} className="logo" alt=""/>*/}
            <form className="form" onSubmit={(e) => forgot(e)}>
              <p className="form-heading">Reset Account</p>
              <div className="email-input">
                <FaPhoneAlt className="input-prepend" />
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Phone No."
                />
              </div>

              <div className="text-end mb-3">
                <span
                  onClick={() => setStep("login")}
                  className="clickable text-info"
                >
                  Have an account? Log in
                </span>
              </div>

              <button type="submit" className="submit-btn">
                Reset
              </button>
            </form>
          </div>
        </div>
      );
    }
    return (
      <div className="p-1 px-md-5">
        <div className="form-card centered column">
          <img src={"/logo.png"} className="logo" alt="" />
          <form className="form" onSubmit={(e) => login(e)}>
            <p className="form-heading">Welcome Back</p>
            <div className="email-input">
              <FaPhoneAlt className="input-prepend" />
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Phone No."
              />
            </div>

            <div className="password-input">
              <Si1Password className="input-prepend" />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                ref={passwordRef}
              />
              <i className="fa fa-eye" onClick={toggleVisibility} />
            </div>
            <div className="text-end mb-3">
              <span
                onClick={() => setStep("reset")}
                className="clickable text-info"
              >
                Forgot Password?
              </span>
            </div>

            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="login company-login">
      <div className="container">
        <div className="row">
          <div className={`col-md-${step === "login" ? "10" : "6"} mx-auto`}>
            <div className="card o-hidden border-0 shadow my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className={` col-lg-${step === "login" ? "7" : "12"}`}>
                    {showStep()}
                  </div>
                  {step === "login" && (
                    <div
                      style={{
                        background: 'url("svg/login-bg.svg")',
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                      }}
                      className="col-lg-4 mx-auto d-none d-lg-block bg-login-image"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-1">
          <a className="text-center mx-auto" href="/admin">
            Sign in as Administrator
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
