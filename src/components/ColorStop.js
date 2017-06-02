import React from 'react'
import './ColorStop.css'

const ColorStop = ({ pos, color }) => {
  return (
    <div style={{ left: pos, backgroundColor: color }} className="cs"></div>
  )
}

export default ColorStop
