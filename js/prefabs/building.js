// -- Generic Building
var Building = function(game, x, y, health, fires, key, src){
	this.saved = game;
	// Creation Code
	Phaser.Sprite.call(this, game, x, y, key, src); // call sprite
	game.physics.enable(this, Phaser.Physics.ARCADE); // enable physics
	this.body.immovable = true; // dsable movement
	this.body.moves = false;
	//this.anchor.set(0.5,0.5); // set anchor to center
	this.game.add.existing(this);
	
	// Parameters
	this.health = health; // default hp set
	this.damageMult = 0.1; // damage multiplier
	this.fireGroup = this.game.add.group(); // generate fire group
	this.fireRed = 0;
	// start # of fires
	for( let i = 0; i < fires; i++){
		this.startFire();
	}
};

Building.prototype = Object.create(Phaser.Sprite.prototype);
Building.prototype.constructor = Building; // creation call

Building.prototype.update = function(){
	if(this.health > 0){
		this.health -= this.fireGroup.countLiving() * this.damageMult;
	}
	else{
		this.fireGroup.removeAll(true);
		this.loadTexture('buildingDestroyed',0);
	}
};

// startFire
// Starts a fire on this building
Building.prototype.startFire = function(){
	// generate fire randomly over this sprite and add to fire group
	var angle = this.game.rnd.integerInRange(0,3);
	// get a random side of the building
		switch(angle){
			case 0: // 0
				var xpos = this.x + this.game.rnd.integerInRange(0,this.width-69);
				var ypos = this.y;
				var ang = 0;
				break;
			case 1: // 90
				var xpos = this.x + this.width-4; // accounting for shadows
				var ypos = this.y+this.game.rnd.integerInRange(0,this.height-69);
				var ang = 90;
				break;
			case 2: // 180
				var xpos = this.x + this.game.rnd.integerInRange(0,this.width-69);
				var ypos = this.y + this.height - 4;
				var ang = 180;
				break;
			case 3: // 270
				var xpos = this.x;
				var ypos = this.y+this.game.rnd.integerInRange(0,this.height-69);
				var ang = 270;
				break;
		}
	// create a fire and add to group based on parameters
	var fire = new Fire(this.game, xpos, ypos, ang);
	this.game.world.moveUp(fire);
	this.fireGroup.add(fire);
};

Building.prototype.damageFire = function(particle,fire){
	particle.kill();
	fire.damage();
}

/*Building.prototype.render = function(){
	this.fireGroup.forEach(function(fire){
			this.game.debug.body(fire);
		},this);
};*/