import React from 'react'
import logo from './logo.svg'
import github from './github-logo.svg'
import twitter from './twitter-logo.svg'
import './App.css'
import { SketchPicker } from 'react-color'
import GradientBuilder from '../GradientBuilder/GradientBuilder'

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
      <div>
        <div className="app-header">
          <h2>
            <img src={ logo } className="app-logo" alt="logo" />
            <span>Gradient Builder</span>
              <a href="https://twitter.com/iurii_kyrylenko" title="Twitter"><img src={ twitter } alt="twitter" /></a>
              <a href="https://github.com/iurii-kyrylenko" title="GitHub"><img src={ github } alt="github" /></a>
          </h2>
        </div>
        <div className="app-content">
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
