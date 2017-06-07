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
