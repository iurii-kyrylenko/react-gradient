import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import ColorStopsHolder from './components/ColorStopsHolder'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>
            <img src={logo} className="App-logo" alt="logo" />
            Palette constructor
          </h3>
        </div>
        <div className="App-content">
          <ColorStopsHolder />
        </div>
      </div>
    )
  }
}

export default App
