import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import {useContext} from "react";
import Login from "./pages/auth/login";
import CompanyLogin from "./pages/auth/CompanyLogin";
import {COMPANY_LOGIN, DASHBOARD, LOGIN} from "./routes";
import "./App.scss";
import Dashboard from "./pages/dashboard";
import {AppContext} from "./context/AppContext";
import Loading from "./components/loading/loading";
import AlertModal from "./components/alert/alert";
import Otpverification from "./components/OtpVerification";

function App() {
  const { isLoading, alert, isLoggedIn } = useContext(AppContext);
  return (
    <div className="App">
      <Router>
        <Switch>
          {isLoggedIn ? (
            <Route path={DASHBOARD} component={Dashboard} />
          ) : (
            <>
              <Route exact path={COMPANY_LOGIN} component={CompanyLogin} />
              <Route exact path={LOGIN} component={Login} />
            </>
          )}
          <Redirect to={isLoggedIn ? DASHBOARD : COMPANY_LOGIN} />
        </Switch>
      </Router>
      {isLoading && <Loading />}
      <Otpverification />
      {alert.showAlert && (
        <AlertModal alertMessage={alert.message} alertType={alert.type} />
      )}

    </div>
  );
}

export default App;
