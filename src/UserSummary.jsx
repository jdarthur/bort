import React, { Component } from 'react'

class UserSummary extends Component {

    render() {
        return (
            <div className="user_summary">
            Logged in as {this.props.username }
            </div>
        )
    }
}
export default UserSummary
