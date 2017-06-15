import React from 'react'
import { SketchPicker } from 'react-color'
import GradientBuilder from '../GradientBuilder/GradientBuilder'
import logo from './logo.svg'
import github from './github-logo.svg'
import twitter from './twitter-logo.svg'
import './App.css'

const WrappedSketchPicker = ({ onSelect, ...rest }) =>
  <SketchPicker { ...rest } onChange={ c => onSelect(c.hex) } />

const Result = ({ msg }) => {
  const info = !msg ? 'Result area' : JSON.stringify(msg)
  return (<div className="result">{ info } </div>)
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      palette1: null,
      palette2: null
    }
  }
  render() {
    return (
      <div>
        <div className="app-header">
          <img src={ logo } className="app-logo" alt="logo" />
          <span>Gradient Builder</span>
          <div className="info">
            A palette has several (at least two) color stops.<br/>
            An active stop has the black triangular point. You can change its color.<br/>
            To activate a stop, press it or start dragging.<br/>
            To add a new stop, press mouse in the stops area (+ cursor position).<br/>
            To remove a stop, drag it away (up or down) from the stops area.
          </div>
          <a href="https://twitter.com/iurii_kyrylenko" title="Twitter">
            <img src={ twitter } alt="twitter" />
          </a>
          <a href="https://github.com/iurii-kyrylenko" title="GitHub">
            <img src={ github } alt="github" />
          </a>
        </div>
        <div className="app-content">
          <div>
            <div className="title">
              With&nbsp;
              <a href="https://github.com/casesandberg/react-color/">react-color</a>
              &nbsp;picker
            </div>
            <Result msg={ this.state.palette1 } />
            <GradientBuilder {...{
              width: 320,
              height: 16,
              palette: [
                { pos: 0.00, color: '#eef10b' },
                { pos: 0.49, color: '#d78025' },
                { pos: 0.72, color: '#d0021b' },
                { pos: 1.00, color: '#7e20cf' }
              ],
              onPaletteChange: (palette1) => this.setState({ palette1 })
            }}>
              <WrappedSketchPicker {...{
                width: 300,
                disableAlpha: true
              }} />
            </GradientBuilder>
          </div>
          <div>
            <div className="title">With default color picker</div>
            <Result msg={ this.state.palette2 } />
            <GradientBuilder {...{
              width: 320,
              height: 32,
              onPaletteChange: (palette2) => this.setState({ palette2 })
            }} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
