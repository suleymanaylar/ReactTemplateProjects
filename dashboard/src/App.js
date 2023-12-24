import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users/Users";
import SignIn from "./pages/SignIn";
import MinistryPage from "./pages/MinistryPage";
import ApplicationsForm from "./pages/ApplicationsForm";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import SessionManager from "./Auth/SessionManager";
import Roles from "./pages/Roles/Roles";

function App() {
  return SessionManager.getToken() ? (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/Users" component={Users} />
          <Route exact path="/MinistryPage" component={MinistryPage} />
          <Route exact path="/ApplicationsForm" component={ApplicationsForm} />
            <Route exact path="/Roles" component={Roles} />
          

          <Redirect from="*" to="/MinistryPage" />
        </Main>
      </Switch>
    </div>
  ) : (
    <Route path={["/", "/login"]} component={SignIn} />
  );
}

export default App;
