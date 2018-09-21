import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet';
class Dashboard extends Component {

    render() {
        const { tweetsId } = this.props
        return (
            <div>
                <h3 className='center'> Your Timeline </h3>
                <ul className='dashboard-list'>
                    {tweetsId.map(id => (

                        <li key={id}>
                            <Tweet id={id} />

                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ tweets }) => {
    return {
        tweetsId: Object.keys(tweets)
            .sort((a, b) => {
                return tweets[b].timestamp - tweets[a].timestamp
            })
    }
}

export default connect(mapStateToProps)(Dashboard)