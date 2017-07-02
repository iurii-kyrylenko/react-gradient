import React from 'react'
import ReactDOM from 'react-dom'
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

  deactivate () {
    this.setState({ dragging: false })
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
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

  handleMouseMove ({ clientX, clientY }) {
    if (!this.state.dragging) return

    const { limits, onDeleteColor, onPosChange, stop: { id, pos } } = this.props

    // Remove stop
    const top = ReactDOM.findDOMNode(this).getBoundingClientRect().top
    if (Math.abs(clientY - top) > limits.drop) {
      this.deactivate()
      onDeleteColor(id)
      return
    }

    // Limit movements
    const offset = pos - this.state.posStart
    const newPos = Math.max(Math.min(offset + clientX, limits.max), limits.min)
    this.setState({ posStart: newPos - offset })
    onPosChange({ id, pos: newPos })
  }

  handleMouseUp () {
    this.deactivate()
  }

  render () {
    const { pos, color, isActive } = this.props.stop
    return (
      <div className={ isActive ? 'cs active' : 'cs' }
           style={{ left: pos }}
           onMouseDown={ this.handleMouseDown }>
        <div style={{ backgroundColor: color }} />
      </div>
    )
  }
}

ColorStop.propTypes = {
  stop: PropTypes.shape({
    id: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    pos: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    pointX: PropTypes.number
  }).isRequired,
  limits: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    drop: PropTypes.number.isRequired
  }).isRequired,
  onPosChange: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired,
  onDeleteColor: PropTypes.func.isRequired
}

export default ColorStop
