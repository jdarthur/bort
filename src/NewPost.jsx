import React, { Component } from 'react'

class NewPost extends Component {
    state = {
        body: "",
    }

    handleChange = event => {
        const {name, value} = event.target

        this.setState({
            [name]: value
        })
    }

    create_post = () => {
        console.log("create new post '" + this.state.body + "'.")
        postData("/posts", {"thread_id" : this.props.thread_id,
                            "post_body" : this.state.body})
    }

    render() {
        return (
            <div>
            <textarea name="body"
                      value={this.state.body}
                      onChange={this.handleChange} />

            <input type="button" value="Post"
                                 onClick={this.create_post} />
            </div>
        )
    }
}

export default NewPost

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
