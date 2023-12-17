import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
import SignIn from "./pages/SignIn";
import MinistryPage from "./pages/MinistryPage";
import ApplicationsForm from "./pages/ApplicationsForm";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up"  setUser={setUser} exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/Users" component={Users} />
          <Route exact path="/MinistryPage" component={MinistryPage} />
          <Route exact path="/ApplicationsForm" component={ApplicationsForm} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={Profile} />

          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
