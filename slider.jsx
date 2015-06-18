var React = require('react')
var ExplicitProps = require('react_explicit_prop_declaration')
var isFunction = require('lodash/lang/isFunction')
var cuid = require('cuid')
var Draggable = require('react-draggable')

var Slider = React.createClass({
    displayName: 'nw-slider',

    mixins: [ExplicitProps],

    propTypes: {
      value: React.PropTypes.number,
      min: React.PropTypes.number,
      max: React.PropTypes.number,
      index: React.PropTypes.string,
      ticks: React.PropTypes.bool,
      onChange: React.PropTypes.func,
      snapToTick: React.PropTypes.bool
    },

    getDefaultProps: function () {
      return {
        value: 0,
        min: 0,
        max: 10,
        index: '0',
        ticks: true
      }
    },

    getInitialState: function () {
      return {
        uniqueID: cuid(),
        steps: [0],
        position: 0,
        value: this.props.value
      }
    },

    setClosestPosition: function (currentPosition) {
      var newPosition = this.getClosestPosition(currentPosition)
      this.setState({position: newPosition - 14})
    },

    shouldComponentUpdate: function (nextProps, nextState) {
      return this.state.position !== nextState.position
    },

    getClosestPosition: function (currentPosition) {
      var steps = this.state.steps
      var sliderWidth = React.findDOMNode(this).offsetWidth
      var currentPercent = currentPosition / sliderWidth * 100

      var bestMatch = steps[0]
      var bestMatchIndex = 0
      steps.forEach(function (element, index, array) {
        if (Math.abs(currentPercent - element) < Math.abs(currentPercent - bestMatch)) {
          bestMatch = element
          bestMatchIndex = index
        }
      })
      this.setState({value: (this.props.min + bestMatchIndex)})
      this.onChange((this.props.min + bestMatchIndex))
      var newPosition = sliderWidth * (bestMatch / 100)
      return newPosition
    },

    clickOnTrack: function (event) {
      var handle = React.findDOMNode(this.refs.handle)
      var clickFromLeft = event.clientX - this.cumulativeOffset(event.target).left

      handle.style.transition = 'transform .2s ease'
      if (this.props.snapToTick) {
        this.setClosestPosition(clickFromLeft)
      }else {
        this.setState({position: clickFromLeft - 14})
        this.getClosestPosition(clickFromLeft)
      }
    },

    handleUp: function (event, ui) {
      if (this.props.snapToTick) {
        var handle = React.findDOMNode(this.refs.handle)
        handle.style.transition = 'transform .2s ease'
        // 14 = half the width of the handle
        this.setClosestPosition(ui.position.left + 14)
      }else {
        this.setState({position: ui.position.left})
        this.getClosestPosition(ui.position.left + 14)
      }
    },

    handleDown: function (event, ui) {
      var handle = React.findDOMNode(this.refs.handle)
      handle.style.transition = ''
    },

    dragging: function (event, ui) {
    },

    onChange: function (value) {
      if (isFunction(this.props.onChange)) {
        this.props.onChange(value)
      }
    },

    cumulativeOffset: function (element) {
      var top = 0
      var left = 0
      do {
        top += element.offsetTop || 0
        left += element.offsetLeft || 0
        element = element.offsetParent
      } while (element)

      return {
          top: top,
          left: left
      }
    },

    fillSteps: function () {
      var steps = this.state.steps
      var min = this.props.min
      var max = this.props.max
      var percentStep = 100 / max
      var cummulativeStep = 0
      for (var i = min; i < max; i++) {
        cummulativeStep += percentStep
        steps.push(cummulativeStep)
      }
    },

    renderTicks: function () {
      var elements = []
      var min = this.props.min
      var max = this.props.max
      var percentStep = 100 / max
      for (var i = min + 1; i < max; i++) {
        var style = {
          left: (percentStep * i) + '%'
        }
        var key = 'tick' + i
        elements.push(<span key={key} className='tick' style={style} ></span>)
      }
      return (
        <div key='ticks' className='ticks' style={{cursor: 'pointer'}} onClick={this.clickOnTrack}>{elements}</div>
      )
    },
    componentDidMount: function () {
      var initialPosition = (React.findDOMNode(this).offsetWidth / (this.props.max - this.props.min) * this.props.value) - 14
      this.setState({position: initialPosition}) // eslint-disable-line react/no-did-mount-set-state
    },

    render: function () {

      React.initializeTouchEvents(true)
      var ticks = this.props.ticks ? this.renderTicks() : ''
      this.fillSteps()
      return (
        <div key='slider' className='slider' style={{position: 'relative'}}>
          <Draggable
            axis='x'
            handle={'#' + this.state.uniqueID}
            bounds='parent'
            start={{x: this.state.position}}
            moveOnStartChange={true}
            onStop={this.handleUp}
            onStart={this.handleDown}
            onDrag={this.dragging}
            key='draggable'
            >
            <span key='handle' ref='handle' className='handle' id={this.state.uniqueID}></span>
          </Draggable>
          {ticks}
          <div key='track' className='track' style={{cursor: 'pointer'}} onClick={this.clickOnTrack}></div>
        </div>
      )
    }
})

module.exports = Slider
