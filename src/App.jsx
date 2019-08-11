import React, { Component } from 'react'
import NavigationBar from './NavigationBar.jsx'
import ThreadList from './ThreadList.jsx'

class App extends Component {

    state = {
        logged_in: false,
        user: null,
        failed_login: false,
    }

    login = (username, password) => {
        postData("/login", {username, password})
            .then(data =>  {
                // const session_id = data.session_id
                // console.log(session_id)
                this.setState({logged_in: true,
                               user: username,})
                               // session_id: session_id})
                return true
            }).catch(error => {
                this.setState({failed_login: true})
                return false
            })
    }

    render() {
        return (
            <div className="page">
            <NavigationBar logged_in={this.state.logged_in} user={this.state.user}
                           login_function={this.login} failed_login={this.state.failed_login}/>
            <ThreadList logged_in={this.state.logged_in} user={this.state.user}/>
            </div>
            )
    }
}

function postData(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.status !== 200) {
            throw new Error(response.status)
        }
        console.log(response)
        return response.json()
    });
}

export default App
