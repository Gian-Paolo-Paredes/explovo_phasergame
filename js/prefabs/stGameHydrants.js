var stGameHydrantGroup = function(game,player){
    this.game = game;
    this.player = player;
    Phaser.Group.call(this,game);

    this.addHydrant(1115,1440);
    this.addHydrant(800,680);
    this.addHydrant(551,1059);
    this.addHydrant(2009,1247);
    this.addHydrant(2335,1826);

    // Specific layering order
    this.game.world.moveDown(this); // now below emitter
    this.game.world.moveDown(this); // now below player
}

stGameHydrantGroup.prototype = Object.create(Phaser.Group.prototype);
stGameHydrantGroup.prototype.constructor = stGameBuildingGroup; // creation call

stGameHydrantGroup.prototype.addHydrant = function(x,y){
   this.hydrant = new Hydrant(this.game,x,y,this.player);
   this.add(this.hydrant);
};

/*	//Hydrants
	for(var i = 0; i < 8; i++){
		this.hydrant = new Hydrant(this.game,125 + i*495,435,this.player);
		this.hydrantGroup.add(this.hydrant);}
	for(var i = 0; i < 2; i++){
		this.hydrant = new Hydrant(this.game,2613 + i*149,200,this.player);
		this.hydrantGroup.add(this.hydrant);}
	for(var i = 0; i < 2; i++){
		this.hydrant = new Hydrant(this.game,1205 + i*149,200,this.player);
		this.hydrantGroup.add(this.hydrant);}
	for(var i = 0; i < 2; i++){
		this.hydrant = new Hydrant(this.game,310 + i*149,200,this.player);
		this.hydrantGroup.add(this.hydrant);}
	this.hydrant = new Hydrant(this.game,1137,896,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,1137,1491,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,1137,1845,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,1415,650,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,2033,650,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,2033,1304,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,1415,1304,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,526,1473,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,526,1840,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,126,1910,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,126,2057,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,310,2290,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,455,2290,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,768,2058,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,1078,2290,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,1225,2290,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,1420,1845,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,1568,2059,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,2100,2290,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,2250,2290,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,2786,586,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,2315,1447,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,2496,2057,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,3007,2057,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,2688,1911,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,311,1015,this.player);
	this.hydrantGroup.add(this.hydrant);
	this.hydrant = new Hydrant(this.game,312,1600,this.player);
	this.hydrantGroup.add(this.hydrant);

*/