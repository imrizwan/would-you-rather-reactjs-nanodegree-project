import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddAnswer } from "../actions/questions";
import { Redirect } from "react-router-dom";

class QuestionDetail extends Component {
  state = {
    selectedAnswer: ""
  };
  handleSaveAnswer(e) {
    e.preventDefault();

    const { dispatch, authedUser, id } = this.props;
    const { selectedAnswer } = this.state;

    dispatch(
      handleAddAnswer({
        qid: id,
        authedUser,
        answer: selectedAnswer
      })
    );
  }
  chooseAnswer(answer) {
    this.setState(prevState => {
      return { selectedAnswer: answer };
    });
  }
  render() {
    const {
      question,
      author,
      answered,
      answer,
      votesOptionOne,
      votesOptionTwo,
      totalVotes,
      percentageOptionOne,
      percentageOptionTwo
    } = this.props;
    const { selectedAnswer } = this.state;

    if (!question) {
      return <Redirect to="/not-found" />;
    }

    return (
      <div className={answered ? "tile-item question-detail" : "tile-item"}>
        {answered ? (
          <div className="tile-header">Asked by {author.name}</div>
        ) : (
          <div className="tile-header">{author.name} asks</div>
        )}
        <div className="tile-body">
          <div className="tile-left">
            <img alt="avatar" className="avatar" src={`/${author.avatarURL}`} />
          </div>

          {!answered ? (
            <div className="question-body">
              <div className="would-you">Would you rather</div>
              <div
                className={
                  selectedAnswer === "optionOne"
                    ? "option option-selected"
                    : "option"
                }
                onClick={e => {
                  this.chooseAnswer("optionOne");
                }}
              >
                {question.optionOne.text}
              </div>
              <div
                className={
                  selectedAnswer === "optionTwo"
                    ? "option option-selected"
                    : "option"
                }
                onClick={e => {
                  this.chooseAnswer("optionTwo");
                }}
              >
                {question.optionTwo.text}
              </div>
              <button
                className={selectedAnswer ? "btn-default" : "disabled"}
                onClick={e => {
                  this.handleSaveAnswer(e);
                }}
              >
                Submit
              </button>
            </div>
          ) : (
            <div className="question-body">
              <div className="would-you">Results: </div>
              <div
                className={
                  answer === "optionOne"
                    ? "option-container selected"
                    : "option-container"
                }
              >
                <div className="option-one">{question.optionOne.text}</div>

                <div className="poll-container">
                  <div>
                    {votesOptionOne} out of {totalVotes} votes
                  </div>
                  <div>Percentage votes: {percentageOptionOne}%</div>
                </div>
                <div className="your-vote">Your pick</div>
              </div>

              <div
                className={
                  answer === "optionTwo"
                    ? "option-container selected"
                    : "option-container"
                }
              >
                <div className="option-two">{question.optionTwo.text}</div>

                <div className="poll-container">
                  <div>
                    {votesOptionTwo} out of {totalVotes} votes
                  </div>
                  <div>Percentage votes: {percentageOptionTwo}%</div>
                </div>
                <div className="your-vote">Your pick</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { match }) {
  const { id } = match.params;
  const question = questions[id];
  const author = question ? users[question.author] : null;
  const answered = question
    ? question.optionOne.votes.indexOf(authedUser) > -1 ||
      question.optionTwo.votes.indexOf(authedUser) > -1
    : false;
  const votesOptionOne =
    question && question.optionOne.votes ? question.optionOne.votes.length : 0;
  const votesOptionTwo =
    question && question.optionTwo.votes ? question.optionTwo.votes.length : 0;
  const totalVotes = votesOptionOne + votesOptionTwo;
  const percentageOptionOne = ((votesOptionOne / totalVotes) * 100).toFixed(1);
  const percentageOptionTwo = ((votesOptionTwo / totalVotes) * 100).toFixed(1);

  //get answer of authedUser
  const answer = users[authedUser].answers[id];

  return {
    id,
    authedUser,
    question,
    author,
    answered,
    answer,
    votesOptionOne,
    votesOptionTwo,
    totalVotes,
    percentageOptionOne,
    percentageOptionTwo
  };
}

export default connect(mapStateToProps)(QuestionDetail);
