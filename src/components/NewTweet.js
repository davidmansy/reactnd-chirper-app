import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddTweet } from '../actions/tweets';
import { Redirect } from 'react-router-dom';

const TWEET_LENGTH = 280;

class NewTweet extends Component {
  state = {
    text: '',
    toHome: false
  };

  handleChange = e => {
    const text = e.target.value;
    this.setState(() => ({
      text
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { text } = this.state;

    const { dispatch, id } = this.props;
    dispatch(handleAddTweet(text, id));
    this.setState(() => ({
      text: '',
      toHome: id ? false : true
    }));
  };

  render() {
    const { text, toHome } = this.state;
    if (toHome) {
      return <Redirect to="/" />;
    }
    const tweetLeft = TWEET_LENGTH - text.length;

    return (
      <div>
        <h3 className="center">Compose new Tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            className="textarea"
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            maxLength={TWEET_LENGTH}
          />
          {tweetLeft <= 100 && <div className="tweet-length">{tweetLeft}</div>}
          <button type="submit" className="btn" disabled={text === ''}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewTweet);
