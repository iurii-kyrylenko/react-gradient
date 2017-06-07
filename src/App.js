import React from 'react'
import logo from './logo.svg'
import './App.css'
import GradientBuilder from './components/GradientBuilder/GradientBuilder'
import { SketchPicker as PluggedPicker } from 'react-color'

const wrap = (Component) => ({ onChange, ...rest }) =>
  <Component { ...rest } onChange={ c => onChange(c.hex) } />

const gradientBuilderWith = (component) => () => {
  const WrappedComponent = wrap(component)
  return (
    <GradientBuilder colorIn="color" colorOut="onChange">
      <WrappedComponent />
    </GradientBuilder>
  )
}

const GradientBuilderWithPluggedPicker = gradientBuilderWith(PluggedPicker)

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
          <GradientBuilderWithPluggedPicker />
       </div>
      </div>
    )
  }
}

export default App
