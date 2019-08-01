import React, { Component } from 'react'
import Thread from "./Thread.jsx"

const threads = [{
    title: "the first ever thread",
    id: 1,
    posts: [
        {
            id: 1,
            user: "jimbo",
            body: "this is the first post in the thread"
        },
        {
            id: 2,
            user: "larry",
            body: "gr8 thread... love it"
        },
        {
            id: 3,
            user: "jimbo",
            body: "thanks buddy"
        },
    ]
},
{
    title: "wow look, another one",
    id: 2,
    posts: [
        {
            id: 1,
            user: "larry",
            body: "i made another thread guys"
        },
        {
            id: 2,
            user: "frank",
            body: "why'd you do that"
        },
        {
            id: 3,
            user: "larry",
            body: "just love to post.. simple as"
        },
        {
            id: 4,
            user: "jimbo",
            body: "respect"
        },
    ]
}
]

class ThreadList extends Component {
    state =  {
        threads: threads
    }

    render() {
        const thread_list = this.state.threads.map((thread) => <Thread key={thread.id} title={thread.title} posts={thread.posts} />);
        return (
            <div className="thread_list">
            {thread_list}
            </div>
            )
    }
}

export default ThreadList
