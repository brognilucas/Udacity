import React, { Component } from 'react'
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti/index'

class Tweet extends Component {

    toParent = (e, id) => {
        e.preventDefault();
        //Todo: Redirect to parent tweet
    }
    handleLike = (e) => {
        e.preventDefault()
    }

    render() {
        const { tweet } = this.props

        if (tweet === null)
            return <p> Tweet doesn't  Exist </p>

        return (
            <div className='tweet'>
                <img
                    src={tweet.avatar}
                    className='avatar'
                />
                <div className='tweet-info'>
                    <div>
                        <span> {tweet.name} </span>
                        <div>
                            {formatDate(tweet.timestamp)}
                        </div>
                        {tweet.parent && (
                            <button className='replying-to' onClick={(e) => this.toParent(e, tweet.parent.id)}>
                                Replying to @{tweet.parent.author}
                            </button>

                        )}
                        <p> {tweet.text} </p>
                    </div>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon' />
                        <span> {tweet.replies !== 0 && tweet.replies} </span>
                        <button className='heart-button' onClick={this.handleLike}> 
                            { tweet.hadLiked ? <TiHeartFullOutline className='tweet-icon' color='#e0245e' /> : <TiHeartOutline  className='tweet-icon' /> } 
                        </button>
                        <span> { tweet.likes !== 0 && tweet.like } </span>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, tweets }, { id }) {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        authedUser,
        tweet: tweet ? formatTweet(tweet, users[tweet.author], tweets, parentTweet) : null
    }

}

export default connect(mapStateToProps)(Tweet)