// -- Generic Fire
var Fire = function(game, x, y){
	
	// Creation Code
	Phaser.Sprite.call(this, game, x, y, 'fire'); // call sprite
	game.physics.enable(this, Phaser.Physics.ARCADE); // enable physics
	this.body.immovable = true; // dsable movement
	this.body.moves = false;
	this.game.add.existing(this);
	
	// Parameters
	this.health = 100; // default hp set
};
	
Fire.prototype = Object.create(Phaser.Sprite.prototype);
Fire.prototype.constructor = Fire; // creation call
