// Water UI
// Reads water level from player object and scales UI element to it
var WaterUI = function(game, player, x, y){
	this.player = player;
	this.uiInner = game.add.image(x,y,'WaterLevel');
	this.uiInner.anchor.set(0,0.5);
	this.uiOuter = game.add.image(x-50,y-40,'WaterBar');
	this.uiInner.scale.x = this.player.waterLevel/this.player.waterLevelTotal;
};

WaterUI.prototype = Object.create(Phaser.Sprite.prototype);
WaterUI.prototype.constructor = WaterUI; // creation call

WaterUI.prototype.update = function(){
	this.uiInner.scale.x = this.player.waterLevel/this.player.waterLevelTotal;
};