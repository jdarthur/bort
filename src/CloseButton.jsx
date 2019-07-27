import React, { Component } from 'react'

class CloseButton extends Component {

    onClick = () => {
        // this.props.handleSubmit(this.state)
        // this.setState(this.initialState)
        console.log("onclick")
        this.props.close_function()
    }

    render() {
        return (
            <div className="x_button" onClick={this.onClick}>
            X
            </div>
        )
    }
}

export default CloseButton
