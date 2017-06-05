import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import GradientBuilder from './components/GradientBuilder/GradientBuilder'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>
            <img src={logo} className="App-logo" alt="logo" />
            Gradient Color Builder
          </h3>
        </div>
        <div className="App-content">
          <GradientBuilder />
        </div>
      </div>
    )
  }
}

export default App
