import React from 'react'
import ColorStop from '../ColorStop/ColorStop'
import PropTypes from 'prop-types'
import './ColorStopsHolder.css'

class ColorStopsHolder extends React.Component {
  constructor () {
    super()
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown (e) {
    e.preventDefault()
    if (e.button) return
    const pos = e.clientX - e.target.getBoundingClientRect().left
    this.props.onAddColor({ pos, pointX: e.clientX })
  }

  render () {
    const { stops, onAddColor, ...rest } = this.props
    return (
      <div className="csh" onMouseDown={ this.handleMouseDown }>
        { stops.map(stop =>
          <ColorStop key={ stop.id } stop={ stop } { ...rest } />
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
      isActive: PropTypes.bool.isRequired,
      pointX: PropTypes.number
    }).isRequired
  ).isRequired,
  limits: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    drop: PropTypes.number.isRequired
  }).isRequired,
  onAddColor: PropTypes.func.isRequired,
  onPosChange: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired,
  onDeleteColor: PropTypes.func.isRequired
}

export default ColorStopsHolder
