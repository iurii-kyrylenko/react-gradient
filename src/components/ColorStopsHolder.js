import React from 'react'
import ColorStop from './ColorStop'
import PropTypes from 'prop-types'
import './ColorStopsHolder.css'

class ColorStopsHolder extends React.Component {
  constructor () {
    super()
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown (e) {
    if (e.button) return
    const pos = e.clientX - e.target.getBoundingClientRect().left
    this.props.onAddColor({ pos, pointX: e.clientX })
  }

  render () {
    return (
      <div className="csh" onMouseDown={ this.handleMouseDown }>
        { this.props.stops.map(stop =>
          <ColorStop
            limits={ this.props.limits }
            key={ stop.id }
            stop={ stop }
            onPosChange={ this.props.onPosChange }
          />
        )}
      </div>
    )
  }
}

ColorStopsHolder.propTypes = {
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      pos: PropTypes.number.isRequired,
      pointX: PropTypes.number
    }).isRequired
  ).isRequired,
  limits: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
  }).isRequired,
  onAddColor: PropTypes.func.isRequired,
  onPosChange: PropTypes.func.isRequired
}

export default ColorStopsHolder
