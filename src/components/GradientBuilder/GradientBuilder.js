import React from 'react'
import PropTypes from 'prop-types'
import ColorStopsHolder from '../ColorStopsHolder/ColorStopsHolder'
import Palette from '../Palette/Palette'
import ColorPicker from '../ColorPicker/ColorPicker'

const HALF_STOP_WIDTH = 5

class GradientBuilder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      palette: [
        { id: 1, pos: 0.2, color: '#a35' },
        { id: 2, pos: 0.4, color: '#35a' },
        { id: 3, pos: 0.6, color: '#5a3' },
        { id: 4, pos: 0.8, color: '#ff0' }
      ],
      activeId: 1,
      pointX: 0
    }
    this.handlePosChange = this.handlePosChange.bind(this)
    this.handleAddColor = this.handleAddColor.bind(this)
    this.handleActivate = this.handleActivate.bind(this)
    this.handleDeleteColor = this.handleDeleteColor.bind(this)
    this.handleSelectColor = this.handleSelectColor.bind(this)
  }

  get width1 () {
    return this.props.width + 1
  }

  get nextId () {
    return Math.max(...this.state.palette.map(c => c.id)) + 1
  }

  get activeStop () {
    return this.state.palette.find(s => s.id === this.state.activeId)
  }

  handleActivate (activeId) {
    this.setState({ activeId })
  }

  handleDeleteColor (id) {
    if (this.state.palette.length < 3) return
    const palette = this.state.palette.filter(c => c.id !== id)
    const activeId = palette.reduce((a, x) => x.pos < a.pos ? x : a, palette[0]).id
    this.setState({ palette, activeId })
  }

  handlePosChange ({ id, pos }) {
    const palette = this.state.palette.map(c =>
      id === c.id ? { ...c, pos: (pos + HALF_STOP_WIDTH) / this.width1 } : { ...c }
    )
    this.setState({ palette })
  }

  handleAddColor ({ pos, pointX }) {
    const color = this.activeStop.color
    const entry = { id: this.nextId, pos: pos / this.width1, color }
    const palette = [...this.state.palette, entry]
    this.setState({ palette, pointX })
  }

  handleSelectColor (color) {
    let { palette, activeId } =  this.state
    palette = palette.map(c =>
      activeId === c.id ? { ...c, color } : { ...c }
    )
    this.setState({ palette })
  }

  get mapStateToStops () {
    const activeId = this.state.activeId
    const pointX = this.state.pointX
    return this.state.palette.map(c => ({
      ...c,
      pos: this.width1 * c.pos - HALF_STOP_WIDTH,
      isActive: c.id === activeId,
      pointX
    }))
  }

  get colorPicker () {
    const { children, colorIn, colorOut } = this.props
    if (!children) {
      return <ColorPicker
        color={ this.activeStop.color }
        onSelect={ this.handleSelectColor }
      />
    }
    const child = React.Children.only(children)
    return React.cloneElement(child, {
      [colorIn]: this.activeStop.color,
      [colorOut]: this.handleSelectColor
    })
  }

  render () {
    const { width, height, drop } = this.props
    const min = -HALF_STOP_WIDTH
    const max = this.width1 - HALF_STOP_WIDTH
    return (
      <div>
        <Palette width={ width } height={ height } palette={ this.state.palette } />
        <ColorStopsHolder
          width={ width }
          stops={ this.mapStateToStops }
          limits={{ min, max, drop }}
          onPosChange={ this.handlePosChange }
          onAddColor={ this.handleAddColor }
          onActivate={ this.handleActivate }
          onDeleteColor={ this.handleDeleteColor }
        />
        { this.colorPicker }
        {/*<pre style={{ fontSize: 10 }}>{ JSON.stringify(this.state, null, 2) }</pre>*/}
      </div>
    )
  }
}

GradientBuilder.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  drop: PropTypes.number
}

GradientBuilder.defaultProps = {
  width: 400,
  height: 32,
  drop: 50
}

export default GradientBuilder
