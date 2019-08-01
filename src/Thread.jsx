import React, { Component } from 'react'
import Post from "./Post.jsx"

class Thread extends Component {

    state = {
        title: this.props.title,
        posts: this.props.posts
    }


    render() {
        const post_list = this.state.posts.map((post) => <Post key={post.id} user={post.user} body={post.body} />);
        return (
            <div className="thread">
            <strong> {this.state.title}</strong>
            {post_list}
            </div>
            )
    }
}

export default Thread
