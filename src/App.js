import React from 'react'
import logo from './logo.svg'
import './App.css'
import GradientBuilder from './components/GradientBuilder/GradientBuilder'
import { SketchPicker } from 'react-color'

const wrap = (Component) => ({ onChange, ...rest }) =>
  <Component { ...rest } onChange={ c => onChange(c.hex) } />

const SketchPickerWrapped = wrap(SketchPicker)

class App extends React.Component {
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

          <GradientBuilder colorIn="color" colorOut="onChange">
            <SketchPickerWrapped />
          </GradientBuilder>
       </div>
      </div>
    )
  }
}

export default App
