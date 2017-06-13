import React from 'react'
import logo from './logo.svg'
import './App.css'
import { SketchPicker } from 'react-color'
import GradientBuilder from './components/GradientBuilder/GradientBuilder'

const WrappedSketchPicker = ({ onSelect, ...rest }) =>
  <SketchPicker { ...rest } onChange={ c => onSelect(c.hex) } />

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      palette: []
    }
    this.handlePaletteChange = this.handlePaletteChange.bind(this)
  }

  handlePaletteChange (palette) {
    this.setState(() => ({ palette }))
  }

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
          <GradientBuilder {...{
            width: 320,
            height: 16,
            onPaletteChange: this.handlePaletteChange
          }}>
            <WrappedSketchPicker {...{
              width: 300,
              disableAlpha: true
            }} />
          </GradientBuilder>
          <div className="result">
            { JSON.stringify(this.state.palette) }
          </div>
       </div>
      </div>
    )
  }
}

export default App
