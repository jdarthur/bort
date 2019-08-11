import React, { Component } from 'react'
import Post from "./Post.jsx"
import NewPost from "./NewPost.jsx"

class Thread extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            posts: []
        }
        get_data('/threads/' + this.props.id).then(data =>  {
               console.log(data)
               this.setState({"posts": data.posts})

            }).catch(error => {
                return false
            })
    }

    render() {
        let post_list = null
        if (this.state.posts.length > 0) {
            post_list = this.state.posts.map((post) => (
                <Post key={post.post_id} user_id={post.user_id}
                      body={post.post_body} date_created={post.date_created}/>
            ))
        }

        return (
            <div className="thread">
            <strong> {this.props.title}</strong>
            {post_list}
            {this.props.logged_in ? <NewPost thread_id={this.props.id}/> : null}
            </div>
            )
    }
}

export default Thread

function get_data(url, query={}) {
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
