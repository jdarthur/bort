import React, { Component } from 'react'
import Thread from "./Thread.jsx"
import NewThread from "./NewThread.jsx"

class ThreadList extends Component {
    constructor(props) {
        super(props)
        this.state =  {
            threads: [],
            show_newthread: false,
        }
        this.get_threads()
    }


    show_newthread = () =>  {
        this.setState({show_newthread: true})

    }

    hide_newthread = () =>  {
        this.setState({show_newthread: false})
    }

    create_thread = (title) => {
        console.log("create thread '" + title + "'")
        postData("/threads", {"thread_title" : title}).then(data => {
            this.hide_newthread()
            this.get_threads()
        }).catch(error => {
            console.log('uh oh')
        })
    }

    get_threads = () => {
        get_data('/threads').then(data =>  {
               console.log(data)
               this.setState({"threads": data.threads})

            }).catch(error => {
                return false
            })
    }


    render() {
        let thread_list = null
        if (this.state.threads.length > 0) {
            thread_list = this.state.threads.map((thread) => (
             <Thread key={thread.thread_id}
                     title={thread.thread_title}
                     id={thread.thread_id}
                     posts={thread.posts}
                     logged_in={this.props.logged_in}
                     user={this.props.user}/>
                 ));
        }

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

function postData(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.status !== 200) {
            throw new Error(response.status)
        }
        console.log(response)
        return response.json()
    });
}

export default ThreadList
