import {useHistory} from "react-router-dom";
import "./styles.scss";
import React, {useContext, useEffect, useRef, useState} from "react";
import {DASHBOARD} from "../../routes";
import {AuthService} from "../../services";
import {catchError, showSuccess} from "../../utils";
// import {FaPhoneAlt, Si1Password} from "react-icons/all";
import { FaPhoneAlt } from 'react-icons/fa';
import { Si1Password } from 'react-icons/si';

import {hideLoading, setAppState, setToken, setUser, showLoading,} from "../../utils/Constants";
import {AppContext} from "../../context/AppContext";

const Login = () => {
  const { isLoggedIn } = useContext(AppContext);
  let { push } = useHistory();
  let [phone, setPhone] = useState("");
  useEffect(() => {
    if (isLoggedIn) setAppState({ userType: "admin" });
    // eslint-disable-next-line
  }, []);
  const [password, setPassword] = useState("");
  const login = (e) => {
    e.preventDefault();
    showLoading();
    AuthService.login({
      phone,
      password,
    })
      .then(({ data }) => {
        showSuccess("Login Successfully");
        const {
          data: { token, user },
        } = data;
        setToken(token);
        setUser(user);
        push(DASHBOARD);
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

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card o-hidden border-0  my-5">
              <div className="card-body p-0">
                <div className="p-5">
                  <div className="form-card centered column">
                    <img src="/logo.png" className="logo" alt="" />

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
                      <button type="submit" className="submit-btn">
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
