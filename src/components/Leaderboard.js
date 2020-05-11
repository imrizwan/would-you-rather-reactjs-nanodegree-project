import React, { Component } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {
  render() {
    const { users } = this.props;
    const sortedUsers = users.sort((a, b) => b.totalScore - a.totalScore);

    return (
      <ul className="users-list">
        {sortedUsers.map(user => (
          <li key={user.id}>
            <div className="tile-item">
              <div className="tile-section section-1">
                <img
                  alt="avatar"
                  className="avatar"
                  src={`/${user.avatarURL}`}
                />
              </div>
              <div className="tile-section section-2">
                <div className="user-name">{user.name}</div>
                <div className="user-answered">
                  <span className="label">Answered questions</span>
                  <span className="value">
                    {Object.keys(user.answers).length}
                  </span>
                </div>
                <div className="user-created">
                  <span className="label">Created questions</span>
                  <span className="value">{user.questions.length}</span>
                </div>
              </div>
              <div className="tile-section section-3">
                <div className="total-score-header">Total Score</div>
                <div className="total-score-count">{user.totalScore}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps({ users }) {
  const usersList = Object.values(users);
  usersList.map(
    user =>
      (user.totalScore =
        Object.keys(user.answers).length + user.questions.length)
  );
  return {
    users: usersList
  };
}

export default connect(mapStateToProps)(Leaderboard);
