import React,  { Component } from 'react'
import CloseButton from "./CloseButton.jsx"

const ClosableCenteredContainer = (WrappedComponent) => {
    class HOC extends Component {

        render() {
            //don't pass the close function to wrapped container
            const props_minus_close_function = {}
            for (let prop in this.props) {
                if (prop !== "close_function") {
                    props_minus_close_function[prop] = this.props[prop]
                }
            }

            return (
                <div className="absolute_centered_container">
                    <div className="relative_inside_centered_container">
                        <CloseButton close_function={this.props.close_function}/>
                        <WrappedComponent {...props_minus_close_function}/>
                    </div>
                </div>
            )
        }
    }
    return HOC
}

export default ClosableCenteredContainer
