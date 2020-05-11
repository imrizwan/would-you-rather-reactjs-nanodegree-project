import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Nav extends Component {
  render() {
    const { user, authedUser } = this.props;
    const avatar = user ? user.avatarURL : "placeholder.png";
    const name = user ? user.name : "";
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item mr-2 active">
              <NavLink to="/dashboard" exact activeClassName="active">
                Home
              </NavLink>
            </li>
            <NavLink
              className="nav-item mr-2"
              to="/add"
              exact
              activeClassName="active"
            >
              New Question
            </NavLink>
            <NavLink
              className="nav-item mr-2"
              to="/leaderboard"
              exact
              activeClassName="active"
            >
              Leader Board
            </NavLink>
            {authedUser && (
              <NavLink
                className="nav-item user-info"
                to="/"
                exact
                activeClassName="active"
              >
                <div className="nav-user">
                  <span>Hello {name}</span>
                  <img
                    src={avatar}
                    alt={`Avatar of ${authedUser}`}
                    className="nav-avatar"
                  />
                  <span>Logout</span>
                </div>
              </NavLink>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users }, props) {
  return {
    authedUser,
    users,
    user: users[authedUser],
  };
}
export default connect(mapStateToProps)(Nav);
