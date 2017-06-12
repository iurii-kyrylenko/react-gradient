import React from 'react'
import logo from './logo.svg'
import './App.css'
import GradientBuilder from './components/GradientBuilder/GradientBuilder'
import { SketchPicker as PluggedPicker } from 'react-color'

const wrap = (Component) => ({ onChange, ...rest }) =>
  <Component { ...rest } onChange={ c => onChange(c.hex) } />

const gradientBuilderWith = (component) => (props) => {
  const WrappedComponent = wrap(component)
  return (
    <GradientBuilder { ...props } colorIn="color" colorOut="onChange">
      <WrappedComponent {...{ width: 300, disableAlpha: true }}  />
    </GradientBuilder>
  )
}

const GradientBuilderWithPluggedPicker = gradientBuilderWith(PluggedPicker)

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      palette: []
    }
    this.handlePaletteChange = this.handlePaletteChange.bind(this)
  }

  handlePaletteChange (palette) {
    console.log(palette)
    // Problem with react-color: dragging breaks
    // this.setState(() => ({ palette }))
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
          <GradientBuilderWithPluggedPicker {...{
            width: 320,
            height: 16,
            onPaletteChange: this.handlePaletteChange
          }} />
          <pre>{ JSON.stringify(this.state.palette, null, 2) }</pre>
       </div>
      </div>
    )
  }
}

export default App
