import React, { Component } from 'react'

class Post extends Component {
    state = {
        user: this.props.user,
        body: this.props.body,
    }

    render() {
        return (
            <div className="post">
            <div className="post_header"> {this.state.user} </div>
            <div className="post_body"> {this.state.body} </div>
            </div>
            )
    }
}

export default Post
