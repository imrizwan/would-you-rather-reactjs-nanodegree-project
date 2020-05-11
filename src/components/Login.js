import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { setAuthedUser, clearAuthedUser } from "../actions/authedUser";

class Login extends Component {
  state = {
    userId: null,
    toHome: false
  };

  handleSelectionChanged = function(event) {
    const userId = event.target.value;

    this.setState(function(previousState) {
      return {
        ...previousState,
        userId
      };
    });
  };

  handleLogin = function(event) {
    const { userId } = this.state;
    const { dispatch } = this.props;

    dispatch(setAuthedUser(userId));

    this.setState(function(previousState) {
      return {
        ...previousState,
        toHome: true
      };
    });
  };

  componentDidMount() {
    this.props.dispatch(clearAuthedUser());
  }

  render() {
    const { userId, toHome } = this.state;
    const { users } = this.props;
    const { from } = this.props.location.state || {
      from: { pathname: "/dashboard" }
    };
    const selected = userId ? userId : -1;

    //if authenticated
    if (toHome) {
      return <Redirect to={from} />;
    }

    return (
      <div className="tile-item login">
        <div className="tile-header">
          <div>Welcome To Would You Rather App</div>
        </div>
        <div className="user-select">
          <div>Please sign in to continue</div>
          <select
            id="login-select"
            value={selected}
            onChange={event => this.handleSelectionChanged(event)}
          >
            <option value="-1" disabled>
              Select user...
            </option>
            {Object.keys(users).map(function(key) {
              return (
                <option value={users[key].id} key={key}>
                  {users[key].name}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className="btn"
          disabled={userId === null}
          onClick={event => this.handleLogin(event)}
        >
          Login
        </button>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users
  };
}

export default withRouter(connect(mapStateToProps)(Login));
