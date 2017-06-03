// Fire Hydrant
var Hydrant = function(game,x,y,player){
	this.player = player;
	Phaser.Sprite.call(this,game,x,y,'hydrant');
	game.physics.enable(this,Phaser.Physics.ARCADE);
	this.body.immovable = true;
	this.body.moves = false;
	this.anchor.set(0.5,0.5);
	this.body.setCircle(10);
	this.game.add.existing(this);
    
    // add in audio
    this.refill = game.add.audio('refill');
    this.refill_done = game.add.audio('refill_done');
};

Hydrant.prototype = Object.create(Phaser.Sprite.prototype);
Hydrant.prototype.constructor = Hydrant;

Hydrant.prototype.update = function(){
	this.game.physics.arcade.collide(this,this.player);
	
	if (this.game.math.distance(this.x, this.y, this.player.x, this.player.y) < 75){
		this.player.waterUp();
        
        // play refill sound if player stands near hydrant with less than max water Level
        if (!this.refill.isPlaying && this.player.waterLevel < 100) {
            this.refill.play('', 0, .75, true);
        } else if (this.player.waterLevel >= 100 && this.refill.isPlaying) { //stop refill sound once water level max
            this.refill.stop();
            this.refill_done.play('', 0, .75, false);
        }
        
	} else if (this.refill.isPlaying) { //stop refill sound if player walks away from hydrant, and play refill done sound
        this.refill.stop();
        this.refill_done.play('', 0, .75, false);
    }
};