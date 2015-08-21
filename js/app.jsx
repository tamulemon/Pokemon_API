var React = require('react');

var Header = require('./header.jsx'), 
		Pokemon = require('./pokemon2.jsx');

var App = React.createClass({
	render: function() {
		return (
			<main>
				<Header />
				<Pokemon />
				<Pokemon />
			</main> 
		)
	}
});
		
React.render(<App appName="PokemonAPI" />, document.body);		