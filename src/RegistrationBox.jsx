import React, { Component } from 'react'
import ClosableCenteredContainer from "./CenteredContainer.jsx"

class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            confirm_password: ""
        }
    }

    handleChange = event => {
        const {name, value} = event.target

        this.setState({
            [name]: value
        })
    }

    register = () => {
        if (this.state.password !== this.state.confirm_password) {
            console.log("passwords do not match")
        }
        else {
            this.props.register_function(this.state.username,
                                         this.state.password)
        }
    }

    render() {
        const {username, password, confirm_password} = this.state
        return (
            <div>
            <label> Username </label>
            <input type="text"  name="username"
                   value={username} onChange={this.handleChange} />

            <label> Password </label>
            <input type="password" name="password"
                   value={password} onChange={this.handleChange} />
            <label> Confirm Password </label>
            <input type="password" name="confirm_password"
                   value={confirm_password} onChange={this.handleChange} />

            <input type="button" value="Submit" onClick={this.register} />
            </div>
        )
    }
}

const RegistrationBox = ClosableCenteredContainer(Registration)

export default RegistrationBox
