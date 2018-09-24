import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading';
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const ADD_TWEET  = 'ADD_TWEET'

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

function toggleTweet({ id, authedUser, hasLiked }) {

    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

function addTweet(tweet){
    return { 
        type: ADD_TWEET, 
        tweet
    }
}

export function handleAddTweet(text, replyingTo){
    return (dispatch, getState) => {
        let { authedUser } = getState()

        dispatch(showLoading())

        saveTweet({ 
            text, author: authedUser , replyingTo
        })
        .then((tweet) => dispatch(addTweet(tweet)))
        .then(() => dispatch(hideLoading()))
    }
}


export function handleToggleTweet(info) {
    return (dispatch) => {
        dispatch(toggleTweet(info))

        return saveLikeToggle(info)
            .catch(e => {
                console.warn('AN Error ocurred on toggle Tweet ', e)
                dispatch(toggleTweet(info))

                alert('AN Error has ocurred, try again')
            })
    }
}