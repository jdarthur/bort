import React, { Component } from 'react'
import User from "./User.jsx"

class Post extends Component {

    render() {
        return (
            <div className="post">
              <User user_id={this.props.user_id} />
              <div className="post_body"> {this.props.body} </div>

            </div>
            )
    }
}

export default Post
