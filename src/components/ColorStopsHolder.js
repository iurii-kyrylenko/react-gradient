import React from 'react'
import ColorStop from './ColorStop'
import './ColorStopsHolder.css'

class ColorStopsHolder extends React.Component {
  constructor () {
    super()
    this.state = {
      stops: [
        { id: 1, pos: 10, color: '#a35' },
        { id: 2, pos: 80, color: '#35a' },
        { id: 3, pos: 140, color: '#5a3' },
        { id: 4, pos: 380, color: '#ff0' }
      ]
    }
    this.handlePosChange = this.handlePosChange.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  get nextId () {
    return Math.max(...this.state.stops.map(s => s.id)) + 1
  }

  handlePosChange ({ id, pos }) {
    const stops = this.state.stops.map(stop =>
      id === stop.id ? { ...stop, id, pos } : { ...stop }
    )
    this.setState({ stops })
  }

  handleMouseDown (e) {
    const pos = e.clientX - e.target.getBoundingClientRect().left - 5
    const stop = { id: this.nextId, pos, color: '#aaa'}
    const stops = [...this.state.stops, stop]
    this.setState({ stops })
  }

  render () {
    return (
      <div className="csh" onMouseDown={ this.handleMouseDown }>
        { this.state.stops.map(stop =>
          <ColorStop limits={{ min: -5, max: 395 }}
                     key={ stop.id }
                     id={ stop.id }
                     pos={ stop.pos }
                     color={ stop.color }
                     onPosChange={ this.handlePosChange }
          />
        )}
      </div>
    )
  }
}

export default ColorStopsHolder
