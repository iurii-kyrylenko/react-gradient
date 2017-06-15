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

const stock = [
  [{pos:0,color:'#f00'},{pos:0.3,color:'#0f0'},{pos:1,color:'#00f'}],
  [{pos:0,color:'#ff0'},{pos:0.6,color:'#f0f'},{pos:1,color:'#0ff'}],
  [{pos:0,color:'#000764'},{pos:0.16,color:'#206bcb'},{pos:0.42,color:'#edffff'},{pos:0.64,color:'#ffaa00'},{pos:0.86,color:'#000200'},{pos:1,color:'#000764'}]
]

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      palette1: null,
      palette2: null,
      selected: undefined
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
              palette: this.state.selected,
              onPaletteChange: (palette2) => this.setState({ palette2 })
            }} />
            <div className="title">Change prop 'palette'</div>
            <div>
              <select onChange={ e => this.setState({ selected: stock[e.target.value] }) }>
                <option>Select palette</option>
                { stock.map((_, i) => <option key={ i } value={ i }>#{ i + 1 }</option>) }
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
