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
        console.log("create new post" + this.state.body)
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
