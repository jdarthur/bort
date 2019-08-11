import React, { Component } from 'react'

class FailureMessage extends Component {
    render() {
        return (
            <div className="failure_message">
            { this.props.message }
            </div>
        )
    }
}

export default FailureMessage
