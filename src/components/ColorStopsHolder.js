import React from 'react'
import ColorStop from './ColorStop'
import './ColorStopsHolder.css'

class ColorStopsHolder extends React.Component {
  constructor () {
    super()
    this.state = {
      stops: [
        { pos: 10, color: '#a35' },
        { pos: 80, color: '#35a' },
        { pos: 140, color: '#5a3' },
        { pos: 380, color: '#53a' }
      ]
    }
  }
  render () {
    return (
      <div className="csh">
        { this.state.stops.map((stop, i) =>
          <ColorStop key={ i } pos={ stop.pos } color={ stop.color } />
        )}
      </div>
    )
  }
}

export default ColorStopsHolder
