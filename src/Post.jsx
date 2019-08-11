import React, { Component } from 'react'
import User from "./User.jsx"
import PostDate from "./PostDate.jsx"

class Post extends Component {

    render() {
        return (
            <div className="post">
              <div className="post_header">
              <User user_id={this.props.user_id} />
              <PostDate date_created={this.props.date_created} />
              </div>
              <div className="post_body"> {this.props.body} </div>

            </div>
            )
    }
}

export default Post
