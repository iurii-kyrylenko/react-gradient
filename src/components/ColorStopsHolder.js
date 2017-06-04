import React from 'react'
import ColorStop from './ColorStop'
import './ColorStopsHolder.css'

class ColorStopsHolder extends React.Component {
  constructor () {
    super()
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown (e) {
    const pos = e.clientX - e.target.getBoundingClientRect().left
    this.props.onAddColor(pos)
  }

  render () {
    return (
      <div className="csh" onMouseDown={ this.handleMouseDown }>
        { this.props.stops.map(stop =>
          <ColorStop
            limits={ this.props.limits }
            key={ stop.id }
            id={ stop.id }
            pos={ stop.pos }
            color={ stop.color }
            onPosChange={ this.props.onPosChange }
          />
        )}
      </div>
    )
  }
}

export default ColorStopsHolder
