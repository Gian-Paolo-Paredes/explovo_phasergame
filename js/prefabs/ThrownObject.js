// -- ThrownObject
var ThrownObject = function(game, spriteObject, positionX, positionY, sounds) {
	// initialize variable
	console.log('object create');
   Phaser.Sprite.call(this, game, positionX, positionY, spriteObject.key, spriteObject.frame);
	this.anchor.set(0.5,0.5); // set anchor to center
	game.physics.enable(this);

	// add this object to the game
	this.game.add.existing(this);

	this.collideWithBuildingEnable = false;
	this.inProgress = false;
	this.building = null;

	game.debug.body(this);

	//this.sound = sounds.key;

};

ThrownObject.prototype = Object.create(Phaser.Sprite.prototype);
ThrownObject.prototype.constructor = ThrownObject;

ThrownObject.prototype.update = function() {

	//enable rotation here
	//this.rotation += randInt(-5, 0);

	if(this.collideWithBuildingEnable === true){
		//stopAndKill = this.onDestroy();
		//l(this.building);
		//l(this);
		this.game.physics.arcade.overlap(this, this.building, l("q")); // emitter with buildings
		/*if(simpleCollisionCheckWithBuilding(this.building)){
			onDestroy(this);
		}*/
	}
/*
	function simpleCollisionCheckWithBuilding(building){
		topLeftX = building.centerX - (building.width/2);
		topLeftY = building.centerY - (building.height/2);
		bottomRightX = topLeftX + building.width;
		bottomRightY = topLeftY + building.height;
		if(this.x > topLeftX && this.x < bottomRightX && this.y > topLeftY && this.y < bottomRightY){
			return true;
		}else{
			return false;
		}
	}*/

	//might need to check that animation began first
	//
	//destroyTween = ;

//	l(this.hitTween);
/*
	if(this.hitTween.onCompleteCallback){
		onDestroy(this.hitTween);
	}*/
/*
	function onDestroy(self){
			//some other code if we want to do some flashy effects and sound effects
			//this.destroy();
			//self.body.velocity.x = 0;
			//self.body.velocity.y = 0;
			//l("destroyed");
			l("X: " + self.x + ", Y: " + self.y);
	}*/

};
/*ThrownObject.prototype.setDestination = function(destinationX, destinationY, velocity){
	if(this.inProgress===false){
		this.inProgress = true;
	}
};*/
ThrownObject.prototype.throwAtBuilding = function(building, velocity){
	this.building = building;
	this.collideWithBuildingEnable = true;
	dX = building.centerX-this.x;
	dY = building.centerY-this.y;
	if(this.inProgress===false){
		this.inProgress = true;
	}
	n = normalize(dX, dY);
	this.body.velocity.x = n.x*velocity;
	this.body.velocity.y = n.y*velocity;
};
/* FAILED FUNCTIONS
ThrownObject.prototype.setDestination = function(destinationX, destinationY, duration){
	if(!this.inProgress){
		this.hitTween = game.add.tween(this).to( { x: destinationX, y: destinationY }, duration, "Quart.easeOut");
		this.inProgress = true;
		this.hitTween.start();
	}
};
ThrownObject.prototype.throwAtBuilding = function(building, duration){
	duration = 2000;
	//l(building);
	if(!this.inProgress){
		this.building = building;
		this.game.physics.enable(this, Phaser.Physics.ARCADE); // enable physics
		this.hitTween = this.game.add.tween(this).to( { x: building.centerX, y: building.centerY }, duration, "Quart.easeOut");
		this.inProgress = true;
		this.hitTween.start();
		this.collideWithBuildingEnable = true;
		//onDestroy(this.hitTween);
	}
};*/
/*
ThrownObject.onDestroy = function(){
	this.hitTween.stop();
	//some other code if we want to do some flashy effects and sound effects
	this.destroy();
};*/
