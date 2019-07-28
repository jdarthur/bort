import React, { Component } from 'react'
import RegistrationBox from './RegistrationBox.jsx'
import LoginBox from "./LoginBox.jsx"

class NavigationBar extends Component {
    state = {
        logged_in: false,
        show_register: false,
        show_login: false
    }

    show_login = () =>  {
        this.setState({show_login: true})
        this.hide_register()
    }

    hide_login = () => {
        this.setState({show_login: false})
    }

    show_register = () =>  {
        this.setState({show_register: true})
        this.hide_login()
    }

    hide_register = () => {
        this.setState({show_register: false})
    }

    login = (username, password) => {
        console.log("logging in as " + username + "/" + password)
        postData("/login", {username, password})
            .then(data => console.log(JSON.stringify(data)))
            .catch(error => console.log(error))

        //send data to server
        //if success,
          //set this.logged_in = true
          //close login box
          //hid reg/login buttons
        //else
          // show login failure message
    }

    register = (username, password) => {
        console.log("registering as " + username + "/" + password)
        postData("/register", {username, password})
            .then(data => console.log(JSON.stringify(data)))
            .catch(error => console.log(error))
        //send data to server
        //if success,
          //tell user to log in
          //close login box
          //hide reg/login buttons
        //else
          // show registration failure message
    }

    render() {
        return (
            <div className="navigation_bar">
            <input className="navigation_bar_button" type="button" value="Log In" onClick={this.show_login} />
            <input className="navigation_bar_button" type="button" value="Register" onClick={this.show_register} />
            { this.state.show_login ? <LoginBox close_function={this.hide_login} login_function={this.login}/> : null }
            { this.state.show_register ? <RegistrationBox close_function={this.hide_register} register_function={this.register}/> : null }
            </div>
            )
    }
}

function postData(url, data) {
  // Default options are marked with *
  console.log(data)
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json()); // parses JSON response into native JavaScript objects
}

export default NavigationBar
