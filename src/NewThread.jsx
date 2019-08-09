import React, { Component } from 'react'

class NewThread extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
        }
    }

    handleChange = event => {
        const {name, value} = event.target

        this.setState({
            [name]: value
        })
    }

    create_thread = () => {
        this.props.create_function(this.state.title)
    }

    render() {
        return (
            <div>
            <input type="text"  name="title"
                   value={this.state.title} onChange={this.handleChange}
                   placeholder="Thread title"/>
            <div className="horizontal_button_holder">
            <input type="button" value="Cancel" className="spaced_button"
                   onClick={this.props.cancel_function} />
            <input type="button" value="Submit" className="spaced_button"
                   onClick={this.create_thread} />
            </div>
            </div>
        )
    }
}

export default NewThread
