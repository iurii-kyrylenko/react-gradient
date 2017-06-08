import React from 'react'
import ColorStop from '../ColorStop/ColorStop'
import PropTypes from 'prop-types'

class ColorStopsHolder extends React.Component {
  constructor (props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  handleMouseDown (e) {
    e.preventDefault()
    if (e.button) return
    const pos = e.clientX - e.target.getBoundingClientRect().left
    this.props.onAddColor({ pos, pointX: e.clientX })
  }

  render () {
    const { width, stops, onAddColor, ...rest } = this.props
    const style = { width, height: 17, position: 'relative', cursor: 'crosshair' }
    return (
      <div className="csh" style={ style } onMouseDown={ this.handleMouseDown }>
        { stops.map(stop =>
          <ColorStop key={ stop.id } stop={ stop } { ...rest } />
        )}
      </div>
    )
  }
}

ColorStopsHolder.propTypes = {
  width: PropTypes.number.isRequired,
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
