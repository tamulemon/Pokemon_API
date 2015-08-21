var React = require('react');
var $ = require('jquery');


var Pokemon = module.exports = React.createClass({
	
	randomrize: function() {
		var totalCount = 719;
		var draw = Math.floor(Math.random() * (totalCount - 1)) + 1;
		this.loadPokemon(draw);
	},

	loadPokemon: function(draw) {
		var Id = draw || 1;
		$.ajax({
			url: 'http://pokeapi.co/api/v1/pokemon/' + Id + '/',
			dataType: 'json',
			type: 'GET',
			cache: true,
			contentType: "application/json; charset=utf-8",
			success: function(data) {
				$.ajax({
					url: 'http://pokeapi.co' + data.sprites[0].resource_uri, 
					dataType: 'json',
					type: 'GET',
					cache: true, 
					contentType: "application/json; charset=utf-8",
					success: function(imgData) {
						var pokeObj = {
							name: data.name, 
							hp: data.hp, 
							imgUri: 'http://pokeapi.co/' + imgData.image
						};
						this.setState ({
							pokemon: this.state.pokemon = pokeObj						 
						});
					}.bind(this), 
					error: function(xhr, status, err) {
							console.error(status, err.toString());
						}.bind(this)
				})
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this)
		});
	},
	
	getInitialState: function() {
		return {pokemon: {}};
	},
	
	componentDidMount: function() {
		this.loadPokemon();
	},
	
	render: function() {
		console.log('this.state.pokemon', this.state.pokemon);
		return (
			<div>
			<h2>Name: {this.state.pokemon.name}</h2>
			<p>Hp: {this.state.pokemon.hp}</p>
			<img src={this.state.pokemon.imgUri} alt="pokemon image" height="150" width="150" />
			<button onClick={this.randomrize}>Randomrize Pokemon</button> 
			</div>
		)
	}
});