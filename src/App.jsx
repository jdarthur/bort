import React, { Component } from 'react'
import NavigationBar from './NavigationBar.jsx'
import ThreadList from './ThreadList.jsx'

class App extends Component {
    render() {
        return (
            <div className="page">
            <NavigationBar />
            <ThreadList />
            </div>
            )
    }
}

export default App
