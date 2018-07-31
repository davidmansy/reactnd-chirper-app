import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets';

export default function receiveTweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      };
    case TOGGLE_TWEET:
      const { id, authedUser, hasLiked } = action;
      return {
        ...state,
        id: {
          ...state[id],
          likes:
            hasLiked === true
              ? state[id].likes.filter(user => user !== authedUser)
              : state[id].likes.concat(authedUser)
        }
      };
    case ADD_TWEET:
      const { tweet } = action;
      let replyingTo = {};
      if (tweet.replyingTo !== null) {
        replyingTo = {
          [tweet.replyingTo]: {
            ...state[tweet.replyingTo],
            replies: state[tweet.replyingTo].replies.concat([tweet.id])
          }
        };
      }
      return {
        ...state,
        [tweet.id]: tweet,
        ...replyingTo
      };
    default:
      return state;
  }
}
