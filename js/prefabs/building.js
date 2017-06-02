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
	// Creation Code
	Phaser.Sprite.call(this, game, x, y, key, src); // call sprite
	game.physics.enable(this, Phaser.Physics.ARCADE); // enable physics
	this.body.immovable = true; // dsable movement
	this.body.moves = false;
	//this.anchor.set(0.5,0.5); // set anchor to center
	this.game.add.existing(this);

	//this.count = game.add.text(740,35, 'X ' + this.fireCount,{fontSize: '25px',fill:'yellow'});
	//this.count.fixedToCamera=true;
	// Parameters
	this.health = health; // default hp set
	this.fireCount = 0;
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
		this.health -= this.fireCount * 0.1;
	}
	else{
		this.fireGroup.removeAll(true);
		this.fireCount = 0;
		this.loadTexture('buildingDestroyed',0);
	}
};

// startFire
// Starts a fire on this building
Building.prototype.startFire = function(){
	// generate fire randomly over this sprite and add to fire group
	//var boom = this.game.add.sprite(this.x + this.game.rnd.integerInRange(0,this.width-100),this.y + this.game.rnd.integerInRange(0,this.height-100),'Explosion');
	//boom.scale.setTo(0.5,0.5);
	//boom.animations.add('BOOM');
	//boom.animations.play('Boom',5,true);

	var fire = this.game.add.sprite(this.x + this.game.rnd.integerInRange(0,this.width-100),this.y + this.game.rnd.integerInRange(0,this.height-100),'Explosion');
	this.onFireCount =+1;
	fire.scale.setTo(0.5,0.5);
	fire.animations.add('FlameOn');

    fire.animations.play('FlameOn', 10, true);

	//fire.anchor.setTo(0.5,0.5);
	this.game.add.existing(fire);
	this.fireGroup.add(fire);
	// increase fire count
	this.fireCount += 1;
};

Building.prototype.damageFire = function(emitter,building){
	// if the building has any fires
	if(this.fireCount > 0){
		this.fireRed += 1; // increase fire decrease timer
		if(this.fireRed > 100 ){ // if it hits a certain threshold
			this.fireGroup.removeChild(this.fireGroup.getRandom()); // remove a fire
			this.fireCount -= 1; // lower fire count
			this.fireRed = 0; // reset counter
			console.log(this.fireCount);
		}
	}
}
