import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'
class NewTweet extends Component {
    
    state = { 
        text: '', 
        redirect: false
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { text , redirect} = this.state
        const { dispatch , id } = this.props

        dispatch(handleAddTweet(text, id))
    

        this.setState( () => ({
            text: '' , 
            redirect: id ? false : true
        }))
    }

    handleChange = (e) => {
        const text  = e.target.value
        this.setState( () => ({
            text
        }))
    }

    render() {
        const { text , redirect } = this.state
        const left = 280 - text.length
        if(redirect)
             return <Redirect to='/' />


        
        return (
            <div>
                <h3 className='center'> Compose New Tweet </h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea className='textarea'
                        onChange={this.handleChange}
                        maxLength={280}
                        placeholder='What is happening?'
                        value={text}
                    />
                    {left <= 100 && (
                        <div className='tweet-length'>
                            {left}
                        </div>
                    )}
                    <button className='btn' type='submit' disabled={text === ''}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewTweet)