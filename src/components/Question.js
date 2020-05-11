import React, { Component } from "react";
import { connect } from "react-redux";

class Question extends Component {
  render() {
    const { question, author } = this.props;
    return (
      <div className="tile-item">
        <div className="tile-header">{author.name} asks</div>
        <div className="tile-body">
          <div className="tile-left">
            <img alt="avatar" className="avatar" src={`/${author.avatarURL}`} />
          </div>

          <div className="question-body">
            <div className="would-you">Would you rather</div>
            <div className="question-text">{question.optionOne.text}...</div>
            <button className="btn-default">View Poll</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const author = question ? users[question.author] : null;

  return {
    authedUser,
    question,
    author
  };
}

export default connect(mapStateToProps)(Question);
