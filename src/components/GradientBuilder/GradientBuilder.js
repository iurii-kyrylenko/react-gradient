import React from 'react'
import ColorStopsHolder from '../ColorStopsHolder/ColorStopsHolder'
import Palette from '../Palette/Palette'

const HALF_STOP_WIDTH = 5
const HOLDER_WIDTH = 400

class GradientBuilder extends React.Component {
  constructor () {
    super()
    this.state = {
      palette: [
        { id: 1, pos: 0.2, color: '#a35' },
        { id: 2, pos: 0.4, color: '#35a' },
        { id: 3, pos: 0.6, color: '#5a3' },
        { id: 4, pos: 0.8, color: '#ff0' }
      ],
      activeId: 1
    }
    this.handlePosChange = this.handlePosChange.bind(this)
    this.handleAddColor = this.handleAddColor.bind(this)
    this.handleActivate = this.handleActivate.bind(this)
    this.handleDeleteColor = this.handleDeleteColor.bind(this)
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
      id === c.id ? { ...c, pos: (pos + HALF_STOP_WIDTH) / HOLDER_WIDTH } : { ...c }
    )
    this.setState({ palette })
  }

  handleAddColor ({ pos, pointX }) {
    const color = this.activeStop.color
    const entry = { id: this.nextId, pos: pos / HOLDER_WIDTH, color, pointX }
    const palette = [...this.state.palette, entry]
    this.setState({ palette })
  }

  get mapStateToStops () {
    const activeId = this.state.activeId
    return this.state.palette.map(c =>
      ({ ...c, pos: HOLDER_WIDTH * c.pos - HALF_STOP_WIDTH, isActive: c.id === activeId })
    )
  }

  render () {
    return (
      <div>
        <Palette />
        <ColorStopsHolder
          stops={ this.mapStateToStops }
          limits={{
            min: -HALF_STOP_WIDTH,
            max: HOLDER_WIDTH - HALF_STOP_WIDTH,
            drop: 50
          }}
          onPosChange={ this.handlePosChange }
          onAddColor={ this.handleAddColor }
          onActivate={ this.handleActivate }
          onDeleteColor={ this.handleDeleteColor }
        />
        <pre>{ JSON.stringify(this.state, null, 2) }</pre>
      </div>
    )
  }
}

export default GradientBuilder
