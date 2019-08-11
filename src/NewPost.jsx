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
        this.props.create_function(this.state.body)
        this.setState({body: ""})
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
