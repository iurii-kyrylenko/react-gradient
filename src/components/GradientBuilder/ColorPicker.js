import React from 'react'
import PropTypes from 'prop-types'
import './ColorPicker.css'

const colors = [
  { value: '#000000', name: 'black' },
  { value: '#808080', name: 'gray' },
  { value: '#C0C0C0', name: 'silver' },
  { value: '#FFFFFF', name: 'white' },
  { value: '#FF0000', name: 'red' },
  { value: '#800000', name: 'maroon' },
  { value: '#FFFF00', name: 'yellow' },
  { value: '#808000', name: 'olive' },
  { value: '#00FF00', name: 'lime' },
  { value: '#008000', name: 'green' },
  { value: '#00FFFF', name: 'aqua' },
  { value: '#008080', name: 'teal' },
  { value: '#0000FF', name: 'blue' },
  { value: '#000080', name: 'navy' },
  { value: '#FF00FF', name: 'fuchsia' },
  { value: '#800080', name: 'purple' }
]

const ColorPicker = ({ onSelect, color }) => {
  return (
    <div className="cp">
      {
        colors.map(c =>
          <div onClick={ () => onSelect(c.value) }
               key={ c.name }
               title={ c.name }
               style={{ backgroundColor: c.value }}
          />
        )
      }
      <pre>Active color: { color }</pre>
    </div>
  )
}

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default ColorPicker
