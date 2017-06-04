import React from 'react'
import ColorStopsHolder from './ColorStopsHolder'

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
      selectedColor: '#fff'
    }
    this.handlePosChange = this.handlePosChange.bind(this)
    this.handleAddColor = this.handleAddColor.bind(this)
  }

  get nextId () {
    return Math.max(...this.state.palette.map(c => c.id)) + 1
  }

  handlePosChange ({ id, pos }) {
    const palette = this.state.palette.map(c =>
      id === c.id ? { ...c, pos: (pos + HALF_STOP_WIDTH) / HOLDER_WIDTH } : { ...c }
    )
    this.setState({ palette })
  }

  handleAddColor (pos) {
    const color = this.state.selectedColor
    const entry = { id: this.nextId, pos: pos / HOLDER_WIDTH, color }
    const palette = [...this.state.palette, entry]
    this.setState({ palette })
  }

  get mapPaletteToStops () {
    return this.state.palette.map(c => ({ ...c, pos: HOLDER_WIDTH * c.pos - HALF_STOP_WIDTH }))
  }

  render () {
    return (
      <ColorStopsHolder
        stops={ this.mapPaletteToStops }
        limits={{ min: -HALF_STOP_WIDTH, max: HOLDER_WIDTH - HALF_STOP_WIDTH }}
        onPosChange={ this.handlePosChange }
        onAddColor={ this.handleAddColor }
      />
    )
  }
}

export default GradientBuilder
