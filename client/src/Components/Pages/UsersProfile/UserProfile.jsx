import React, { useState, useEffect } from 'react'
import TweetCard from '../../SharedComponents/tweetcard'

import './styles.css'

const UserProfile = ({ match }) => {
    const [tweets, setTweets] = useState(null)
    const id = match.params.id

    useEffect(() => {
        getTweets()
    }, [match.params.id])

    const getTweets = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        }
        fetch('http://127.0.0.1:8000/user/details', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setTweets(data.tweets)
            })
    }

    return (
        <div className='userprofile'>
            <div className='tweets'>
                {
                    tweets && tweets.map((tweet, id) => <TweetCard key={id} tweet={tweet} />)
                }
            </div>
        </div>
    )
}

export default UserProfile