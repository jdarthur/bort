import React, { Component } from 'react'
import NavigationBar from './NavigationBar.jsx'
import ThreadList from './ThreadList.jsx'

class App extends Component {

    state = {
        logged_in: false,
        user: null
    }

    login = (username, password) => {
        console.log("logging in as " + username + "/" + password)
        postData("/login", {username, password})
            .then(data =>  {
                console.log(JSON.stringify(data))
                this.setState({logged_in: true, user: username})
                return true
            })
            .catch(error => console.log(error))

        //send data to server
        //if success,
          //set this.logged_in = true
          //close login box
          //hid reg/login buttons
        //else
          // show login failure message
    }

    render() {
        return (
            <div className="page">
            <NavigationBar logged_in={this.state.logged_in} user={this.state.user} login_function={this.login}/>
            <ThreadList />
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

export default App
