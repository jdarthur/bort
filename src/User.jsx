import React, { Component } from 'react'

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ""
        }
        get_data('/users/' + this.props.user_id).then(data =>
            this.setState({"username": data.name})
        ).catch(error => {
            return false
        })
    }

    render() {
        return (
            <div className="username"> {this.state.username} </div>
            )
    }
}

export default User

function get_data(url) {
    console.log("getting data from '" + url + "'")
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.status !== 200) {
            throw new Error(response.status)
        }
        return response.json()
    });
}
