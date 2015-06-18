/**
 * This is a simple example of sliders.
 */
var React = require('react')

var Slider = require('../slider.jsx')

module.exports = (
  <div>
    <Slider min={0} max={4} value={3} snapToTick={false} />
    <Slider min={0} max={10} value={3} snapToTick={true} />
    <Slider min={0} max={10} value={3} ticks={false} snapToTick={false} />
    <Slider min={0} max={100} snapToTick={true} ticks={true} />
  </div>
)
