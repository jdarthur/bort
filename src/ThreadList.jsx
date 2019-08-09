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
    constructor(props) {
        super(props)
        this.state =  {
            threads: threads,
            show_newthread: false,
        }
        get_data('/threads').then(data =>  {
                console.log(data)
            }).catch(error => {
                return false
            })
    }


    show_newthread = () =>  {
        this.setState({show_newthread: true})

    }

    hide_newthread = () =>  {
        this.setState({show_newthread: false})
    }

    create_thread = (title) => {
        console.log("create thread '" + title + "'")
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
            { this.state.show_newthread ? <NewThread create_function={this.create_thread}
                                                     cancel_function={this.hide_newthread}/> : null}
            {thread_list}
            </div>
            )
    }
}

function get_data(url) {
    console.log("getting data from '" + url + "'")
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.status !== 200) {
            throw new Error(response.status)
        }
        return response.json()
    });
}

export default ThreadList
