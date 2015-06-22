# Greg's Slider

Slider component for react. 🔥🔥🔥

Special thanks to [@abacon](https://github.com/abacon) & [@derekr](https://github.com/derekr) for answering all my questions!

## Demo

[✨DEMO ✨](http://gregdmathews.com/greg-slider/)

## Installing

```bash
$ npm install greg-slider
```


If you aren't using browserify, a
[compiled version of greg-slider](dist/slider.js) is available.

## Details
A `<GregSlider />` element is an improved upon version of an HTML5 range type input. You are able to smoothly drag the handle no matter how large or small the number of your steps are, and you are able to style it more effectively. You can also add tick marks to your steps if you wish. `<GregSlider />` is also compatible with IE9.

## API
Props:

**`value`**: Determines the start position of your slider. Must be a number between `min` and `max`. Default `value` is `min`.

**`min`**: The smallest number you want in the range. Default `min` is 0.

**`max`**: The largest number you want in the range. Default `max` is 10.

**`ticks`**: A boolean to show tick marks on the slider. Default true.

**`onChange`**: A function that will be fired when the position of the handle changes. Default none

**`snapToTick`**: A boolean to have the handle snap to a tick mark. Default true

## Example usage

```js
/** @jsx React.DOM */
var React = require('react'),
	GregSlider = require('greg-slider');

var App = React.createClass({

  handleChange: function () {
		console.log('Change');
	},

	render: function () {
		return (
			<GregSlider
				value={0}
				min={0}
				max={10}
				ticks={true}
				snapToTick={true}
				grid={[25, 25]}
				zIndex={100}
				onChange={this.handleChange} />
		);
	}
});

React.renderComponent(<App/>, document.body);
```



value: React.PropTypes.number,
min: React.PropTypes.number,
max: React.PropTypes.number,
ticks: React.PropTypes.bool,
onChange: React.PropTypes.func,
snapToTick: React.PropTypes.bool

## Contributing

- Fork the project
- Make changes.
- Double check changes work by adding it to the examples: `$ ./build-examples`
- Update README with appropriate docs.
- Commit and PR

## License

MIT
