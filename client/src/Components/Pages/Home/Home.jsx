import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Tweets from './Tweets'
import Tweet from './Tweet'

import './Home.css'

const Explore = ({ user }) => {
    const [tweets, setTweets] = useState(null)
    const [following, setFollowing] = useState([])
    console.log('following t', following)
    useEffect(() => {
        getTweets()
    }, [])

    const getTweets = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: user.id })
        }
        fetch('http://127.0.0.1:8000/user/details', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setTweets(data.tweets)
                getFollowing({ userTo: data.userTo, id: user.id })
            })
    }

    const getFollowing = (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        }
        fetch('http://127.0.0.1:8000/tweet/following', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Following', data)

                data.sort(function (a, b) {

                    return new Date(b.created_at) - new Date(a.created_at);
                })
                setFollowing(data)

            })
    }



    return (
        <div className='home'>
            <Tweet setTweets={setFollowing} tweets={following} />
            <Tweets tweets={following} />
        </div>
    )
}

const mapStateToProps = ({ user: { user } }) => {
    return {
        user
    }
}



export default connect(mapStateToProps)(Explore)