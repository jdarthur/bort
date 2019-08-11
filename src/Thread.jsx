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
        this.get_posts()
    }

    get_posts = () => {
        get_data('/threads/' + this.props.id).then(data =>  {
           console.log(data)
           this.setState({"posts": data.posts})

        }).catch(error => {
            return false
        })
    }

    create_post = (post_body) => {
        postData("/posts",
                 {"thread_id" : this.props.id,
                  "post_body" : post_body}).then(data =>
            this.get_posts()
        ).catch(error => {
            console.log('uh oh')
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
            {this.props.logged_in ? <NewPost thread_id={this.props.id}
                                             create_function={this.create_post}/> : null}
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

function postData(url, data) {
    console.log(data)
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
