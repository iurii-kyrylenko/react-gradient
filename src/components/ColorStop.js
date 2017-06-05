import React from 'react'
import PropTypes from 'prop-types'
import './ColorStop.css'

class ColorStop extends React.Component {
  constructor () {
    super()
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.state = {
      posStart: 0,
      dragging: false
    }
  }

  activate (pointX) {
    this.setState({ posStart: pointX, dragging: true })
    this.props.onActivate(this.props.stop.id)
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  componentDidMount () {
    // Start dragging right after adding new stop.
    // pointX is the cursor position when new stop has been created.
    const { pointX } = this.props.stop
    if (pointX) this.activate(pointX)
  }

  handleMouseDown (e) {
    e.preventDefault()
    e.stopPropagation()
    if (!e.button) this.activate(e.clientX)
  }

  handleMouseMove (e) {
    if (!this.state.dragging) return
    const { limits, onPosChange, stop: { id, pos } } = this.props
    const newPos = pos + e.clientX - this.state.posStart
    if (newPos < limits.min || newPos > limits.max) return
    this.setState({ posStart: e.clientX })
    onPosChange({ id, pos: newPos })
  }

  handleMouseUp () {
    this.setState({ dragging: false })
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  render () {
    const { pos, color } = this.props.stop
    return (
      <div className="cs"
           onMouseDown={ this.handleMouseDown }
           style={{ left: pos, backgroundColor: color }}>
      </div>
    )
  }
}

ColorStop.propTypes = {
  stop: PropTypes.shape({
    id: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    pos: PropTypes.number.isRequired,
    pointX: PropTypes.number
  }).isRequired,
  limits: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
  }).isRequired,
  onPosChange: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired
}

export default ColorStop
