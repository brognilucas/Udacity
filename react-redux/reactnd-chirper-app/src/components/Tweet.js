import React, { Component } from 'react'
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti/index'
import { handleToggleTweet } from '../actions/tweets'
import { Link,withRouter } from 'react-router-dom'
class Tweet extends Component {

    toParent = (e, id) => {
        e.preventDefault();

        this.props.history.push(`/tweet/${id}`)
        
    }
    
    handleLike = (e) => {
        e.preventDefault()

        const { dispatch, tweet , authedUser } = this.props
        dispatch(handleToggleTweet({ 
            id: tweet.id,
            authedUser, 
            hasLiked: tweet.hasLiked
        }))
    }

    render() {
        const { tweet } = this.props

        if (tweet === null)
            return <p> Tweet doesn't  Exist </p>

        return (
            <Link to={`/tweet/${tweet.id}`} className='tweet'>
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
                            { tweet.hasLiked ? <TiHeartFullOutline className='tweet-icon' color='#e0245e' /> : <TiHeartOutline  className='tweet-icon' /> } 
                        </button>
                        <span> { tweet.likes !== 0 && tweet.likes } </span>
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps({ authedUser, users, tweets }, { id }) {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        authedUser,
        tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
    }

}

export default withRouter(connect(mapStateToProps)(Tweet))