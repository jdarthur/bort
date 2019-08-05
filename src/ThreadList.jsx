import React, { Component } from 'react'
import Thread from "./Thread.jsx"
import NewThread from "./NewThread.jsx"

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
        threads: threads,
        show_newthread: false,
    }

    show_newthread = () =>  {
        this.setState({show_newthread: true})
    }

    hide_newthread = () =>  {
        this.setState({show_newthread: true})
    }

    render() {
        const thread_list = this.state.threads.map((thread) => (
             <Thread key={thread.id}
                     title={thread.title}
                     posts={thread.posts}
                     logged_in={this.props.logged_in} />
                 ));
        return (
            <div className="thread_list">
            { (this.props.logged_in && !this.state.show_newthread ) ? <input type="button" value="New thread"
                                                                             onClick={this.show_newthread} /> : null }
            { this.state.show_newthread ? <NewThread /> : null}
            {thread_list}
            </div>
            )
    }
}

export default ThreadList
