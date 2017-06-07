// Building Group for stGame
// Add or remove buildings here
var stGameBuildingGroup = function(game){
   this.game = game;
    Phaser.Group.call(this,game);
    this.addBuilding(1000,1000,1000,3,'Building01');
    this.addBuilding(1646,2285,100,3,'Building03');
    this.addBuilding(758,2284,100,3,'Building04');
    this.addBuilding(2620,1585,100,3,'Building05');
    this.addBuilding(628,831,100,3,'Building06');
    this.addBuilding(804,1655,1000,3,'Building07');
    this.addBuilding(1654,199,100,3,'Building08');
    this.addBuilding(1726,1567,1000,3,'Building09');
}

stGameBuildingGroup.prototype = Object.create(Phaser.Group.prototype);
stGameBuildingGroup.prototype.constructor = stGameBuildingGroup; // creation call

stGameBuildingGroup.prototype.addBuilding = function(x,y,hp,fires,type){
   this.building = new Building(this.game,x,y,hp,fires,type);
   this.add(this.building);
};

// this.buildingGroup = this.game.add.group(); // generate building group
   //this.building = new Building(this.game,1200,1190,200,this.game.rnd.integerInRange(1,5),"Building01");
	//this.buildingGroup.add(this.building);
   
   /*this.building = new Building(this.game,830,156,200,this.game.rnd.integerInRange(1,5),'building5', 'buildingDestroyed5');
   this.buildingGroup.add(this.building);
   
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(621+(417*i)),191,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(2912+(200*i)),173,200,this.game.rnd.integerInRange(1,5),'building5', 'buildingDestroyed5');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(1518+(255*i)),191,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(2113+(325*i)),191,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
		this.buildingGroup.add(this.building);
	}
	
	this.building = new Building(this.game,2671,1231,200,this.game.rnd.integerInRange(1,5),'building6', 'buildingDestroyed6');
	this.buildingGroup.add(this.building);
	
	this.building = new Building(this.game,1622,1544,200,this.game.rnd.integerInRange(1,5),'fireStation', 'fireStationDestroyed');
	this.buildingGroup.add(this.building);
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,1834 + i*100,(1441),200, this.game.rnd.integerInRange(1,5),'fTruck', 'fTruckDestroyed');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 3; i++){
		this.building = new Building(this.game,(988),(760 + i*260),200,this.game.rnd.integerInRange(1,5),'building2', 'buildingDestroyed2');
		this.buildingGroup.add(this.building);
	}
	
	this.building = new Building(this.game,637,826,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
	this.buildingGroup.add(this.building);
	
	this.building = new Building(this.game,637,1281,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
	this.buildingGroup.add(this.building);
	
	this.building = new Building(this.game,821,1662,200,this.game.rnd.integerInRange(1,5),'building3', 'buildingDestroyed3');
	this.buildingGroup.add(this.building);
	
	this.building = new Building(this.game,125,823,200,this.game.rnd.integerInRange(1,5),'building4', 'buildingDestroyed4');
	this.buildingGroup.add(this.building);
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(635 + i*250),(2261),200,this.game.rnd.integerInRange(1,5),'building4', 'buildingDestroyed4');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(2424 + i*450),(2272),200,this.game.rnd.integerInRange(1,5),'building4', 'buildingDestroyed4');
		this.buildingGroup.add(this.building);
	}
	
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(2650 + i*450),(2277),200,this.game.rnd.integerInRange(1,5),'building5', 'buildingDestroyed5');
		this.buildingGroup.add(this.building);
	}
	
	this.building = new Building(this.game,135,2290,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
	this.buildingGroup.add(this.building);
   
	for(var i = 0; i < 2; i++){
		this.building = new Building(this.game,(1393+(225*i)),2289,200,this.game.rnd.integerInRange(1,5),'building1', 'buildingDestroyed1');
		this.buildingGroup.add(this.building);
	}
	
	this.building = new Building(this.game,1890,2300,200,this.game.rnd.integerInRange(1,5),'building2', 'buildingDestroyed2');
	this.buildingGroup.add(this.building);
	
	for(var i = 0; i < 3; i++){
		this.building = new Building(this.game,(93),(1201 + i*260),200,this.game.rnd.integerInRange(1,5),'building2', 'buildingDestroyed2');
		this.buildingGroup.add(this.building);
	}*/