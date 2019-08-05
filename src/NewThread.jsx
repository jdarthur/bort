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
        console.log("create new thread " + this.state.title)
    }

    render() {
        return (
            <div>
            <input type="text"  name="title"
                   value={this.state.title} onChange={this.handleChange}
                   placeholder="Thread title"/>

            <input type="button" value="Submit" onClick={this.create_thread} />
            </div>
        )
    }
}

export default NewThread
