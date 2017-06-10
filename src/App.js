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
      <WrappedComponent />
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
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (palette) {
    this.setState({ palette })
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
          <GradientBuilder onSubmit={ this.handleSubmit } />
          <hr />
          <GradientBuilderWithPluggedPicker {...{
            width: 320,
            height: 16,
            defaultValue: [
              {  pos: 0.00, color: '#f00' },
              {  pos: 0.20, color: '#ff0' },
              {  pos: 0.40, color: '#0f0' },
              {  pos: 0.60, color: '#0ff' },
              {  pos: 0.80, color: '#00f' },
              {  pos: 1.00, color: '#f0f' }
            ],
            onSubmit: this.handleSubmit
          }} />
          <hr />
          <pre style={{ fontSize: 10 }}>{ JSON.stringify(this.state.palette, null, 2) }</pre>
       </div>
      </div>
    )
  }
}

export default App
