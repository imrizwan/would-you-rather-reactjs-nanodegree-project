import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Login from "./Login";
import QuestionDetail from "./QuestionDetail";
import Leaderboard from "./Leaderboard";
import Nav from "./Nav";
import "../App.css";
import NewQuestion from "./NewQuestion";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <div>
            <Nav />
            <div className="main-content">
              <Switch>
                <Route path="/" exact component={Login} />
                <ProtectedRoute path="/dashboard" exact component={Dashboard} />
                <ProtectedRoute path="/add" exact component={NewQuestion} />
                <ProtectedRoute
                  path="/question/:id"
                  component={QuestionDetail}
                />
                <ProtectedRoute path="/leaderboard" component={Leaderboard} />
                <Route path="/not-found" component={NotFound} />
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default connect()(App);
