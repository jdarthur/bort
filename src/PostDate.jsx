import React, { Component } from 'react'

class PostDate extends Component {

    render() {
        const date_ms = Date.parse(this.props.date_created)
        const date_better = new Date(date_ms).toLocaleTimeString('en-US')
        return (
            <div className="post_date"> {date_better} </div>
            )
    }
}

export default PostDate
