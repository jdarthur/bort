import React, { Component } from 'react'
import ClosableCenteredContainer from "./CenteredContainer.jsx"
import FailureMessage from "./FailureMessage.jsx"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }

    }

    handleChange = event => {
        const {name, value} = event.target

        this.setState({
            [name]: value
        })
    }

    login = () => {
        this.props.login_function(this.state.username,
                                  this.state.password)
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
            { this.props.failed_login ? <FailureMessage message="Invalid username or password"/> : null }
            <input type="button" value="Submit" onClick={this.login} />
            </div>
        )
    }
}

const LoginBox = ClosableCenteredContainer(Login)

export default LoginBox
