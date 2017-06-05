// -- Generic Building

var Building = function(game, x, y, health, fires, key, src){

	//var onFire = game.add.sprite(game.world.centerX, 300,'Flame');
   	//this.onFIre.animations.add('FlameOn', Phaser.Animation.generateFrameNames('FlameOn', 1, 6), 5, true);
	//onFire.animations.add('FlameOn');

   // onFire.animations.play('FlameOn', 24, true);

    //  Bob the octopus up and down with a tween
   // game.add.tween(octopus).to({ y: 300 }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);



    //var octopus = game.add.sprite(300, 200, 'octopus');

	this.onFireCount=0;
	this.saved = game;
  
	// Creation Code
	Phaser.Sprite.call(this, game, x, y, key, src); // call sprite
	game.physics.enable(this, Phaser.Physics.ARCADE); // enable physics
	this.body.immovable = true; // dsable movement
	this.body.moves = false;
	this.anchor.set(0.5,0.5); // set anchor to center
	this.game.add.existing(this);

	//this.count = game.add.text(740,35, 'X ' + this.fireCount,{fontSize: '25px',fill:'yellow'});
	//this.count.fixedToCamera=true;
	this.isDead = false;

	// Parameters
	this.health = health; // default hp set
	this.damageMult = 0.1; // damage multiplier
	this.fireGroup = this.game.add.group(); // generate fire group
	// start # of fires
	for( let i = 0; i < fires; i++){
		let j = game.rnd.integerInRange(-2,3);
		this.startFire(j);
	}
	// debug
	// this.starterFire = game.input.keyboard.addKey(Phaser.Keyboard.T);
};

Building.prototype = Object.create(Phaser.Sprite.prototype);
Building.prototype.constructor = Building; // creation call

Building.prototype.update = function(){
	// Indicator management
	if (this.fireGroup.countLiving() > 0){
		// movement of the fire indicator
		this.indicator.rotation = this.saved.physics.arcade.angleBetween(this,this.indicator);
		this.indicator.x = this.saved.camera.target.x;
		this.indicator.y = this.saved.camera.target.y;
	}
	else{
		if(this.indicator!==undefined){
			this.indicator.kill();
		}
	}

	// Building health damage
	if(this.health > 0){
		this.health -= this.fireGroup.countLiving() * this.damageMult;
	}
	else{
		this.isDead = true;
		this.fireGroup.removeAll(true);
		this.loadTexture('buildingDestroyed',0);
	}
	// Debug code
	/*this.fireGroup.forEach(function(fire){
		this.saved.debug.body(fire);
	},this);*/
};

// startFire
// Starts a fire on this building

//var boom = this.game.add.sprite(this.x + this.game.rnd.integerInRange(0,this.width-100),this.y + this.game.rnd.integerInRange(0,this.height-100),'Explosion');
	//boom.scale.setTo(0.5,0.5);
	//boom.animations.add('BOOM');
	//boom.animations.play('Boom',5,true);



	//fire.anchor.setTo(0.5,0.5);
// Accepts a side in radians and generates a random fire
Building.prototype.startFire = function(side){
	// Get the side of the building that was lit
	var angle = rToA(side);
	if (angle >= -45 && angle <= 45){ // left
		var xpos = (this.x - this.width/2);
		var ypos = (this.y - this.height/2) + this.game.rnd.integerInRange(0,this.height-69);
		var ang = 270;
	}
	else if( angle >= 46 && angle <= 135){ // top
		var xpos = (this.x - this.width/2) + this.game.rnd.integerInRange(0,this.width-48);
		var ypos = (this.y - this.height/2);
		var ang = 0;
	}
	else if( angle >= -135 && angle <= -44){ // bottom
		var xpos = (this.x - this.width/2) + this.game.rnd.integerInRange(0,this.width-69);
		var ypos = (this.y - this.height/2) + this.height - 4;
		var ang = 180;
	}
	else{ // right
		var xpos = (this.x - this.width/2) + this.width-4; // accounting for shadows
		var ypos = (this.y - this.height/2) + this.game.rnd.integerInRange(0,this.height-48);
		var ang = 90;
	}

	// create a fire and add to group based on parameters
	var fire = new Fire(this.game, xpos, ypos, ang);
  fire.scale.setTo(0.5,0.5);
	fire.animations.add('FlameOn');
  fire.animations.play('FlameOn', 10, true);
	this.game.world.moveUp(fire);
  
  this.game.add.existing(fire);
  this.onFireCount =+1;

  this.fireGroup.add(fire);
	if(this.fireGroup.countLiving() == 1){
		// fire indicator
		this.indicator = this.saved.add.sprite(this.saved.camera.target.x,this.saved.camera.target.y,'indi');
		this.indicator.anchor.setTo(0.5,0.5);
	}
	// sound goes here
};

Building.prototype.damageFire = function(particle,fire){
	fire.damage();
}
