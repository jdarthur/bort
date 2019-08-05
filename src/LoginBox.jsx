import React, { Component } from 'react'
import ClosableCenteredContainer from "./CenteredContainer.jsx"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = event => {
        const {name, value} = event.target

        this.setState({
            [name]: value
        })
    }

    login = () => {
        const success = this.props.login_function(this.state.username,
                                                  this.state.password)
        console.log(success)
        if (!success) {
            console.log("login failed")
        }
    }

    render() {
        const {username, password} = this.state
        return (
            <div>
            <label> Username </label>
            <input type="text"  name="username"
                   value={username} onChange={this.handleChange} />

            <label> Password </label>
            <input type="password" name="password"
                   value={password} onChange={this.handleChange} />

            <input type="button" value="Submit" onClick={this.login} />
            </div>
        )
    }
}

const LoginBox = ClosableCenteredContainer(Login)

export default LoginBox
