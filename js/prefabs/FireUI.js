// Fire UI - incomplete
// Should take sum of all building HP and scale fire bar to it
var FireUI = function(game, total, x, y){
	// create UI
	this.uiInner = game.add.image(x,y,'FireLevel');
	this.uiInner.anchor.set(0.5,1);
	this.uiOuter = game.add.image(x-41,y-285,'FireBar');
	
	// create scaling factor
	this.total = total; // start both values at full
	this.current = total; 
	this.uiInner.scale.x = this.current / this.total;
};

FireUI.prototype = Object.create(Phaser.Sprite.prototype);
FireUI.prototype.constructor = FireUI; // creation call

FireUI.prototype.update = function(){
	this.uiInner.scale.y = this.current/this.total;
};