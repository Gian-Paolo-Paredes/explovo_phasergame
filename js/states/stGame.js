//Main this.game State
var stGame = function(game) {
    //Rioter_
   var MM;
   var MM2;
   //_Rioter
};
stGame.prototype = {
   preload: function(){
      this.game.time.advancedTiming = true;
      //Rioter_
      MM = new MobManager(100, 50, 100, 1, 1.5, 1);
      //_Rioter
   },//end_preload
   create: function() {
   //--/ variable assignments
   console.log('game bg');
      //--/ tilemap variable
		this.game.world.setBounds(0,0,2400,1832); // initialize world bounds
        this.game.stage.backgroundColor = "#228B22";
		//this.game.add.tileSprite(0,0,1200,912,'bg');
		this.map = this.game.add.tilemap('CityTilemap');
        this.map.addTilesetImage('CityTileset64', 'CityTileset64');
        this.backgroundLayer = this.map.createLayer('Background');
		//this.backgroundLayer.scale.setTo(2,2);
        this.groundLayer = this.map.createLayer('ForeGround');
		//this.groundLayer.scale.setTo(2,2);

      // Create a new Player
   	  this.player = new Player(this.game,this.game.world.centerX, this.game.world.centerY, 'assets' , 'firefighter');
	  this.game.camera.focusOnXY(this.player.x,this.player.y);
      this.game.camera.follow(this.player,4,0.1,0.1);  // set camera to player

	  // Attach hose to player object
      this.emitter = new WaterHose(this.game, this.player, 30, 15);
      this.world.moveDown(this.emitter); // emitter below player

   // Create environment
	this.hydrantGroup = new stGameHydrantGroup(this.game,this.player); // Hydrants
	this.buildingGroup = new stGameBuildingGroup(this.game); // Buildings

   // Start music
   this.bg_music = this.game.add.audio('game_music');
   this.bg_music.play('', 0, 1, true);

   //create rioters and add to MobManager
   for(i=0; i<19; i++){
      rioter = new Rioter(this.game, {key: 'assets', frame: 'rioter'}, this.game.rnd.integerInRange(0, this.game.width), this.game.rnd.integerInRange(0, this.game.height));
      MM.addMob(rioter);
      this.game.add.existing(rioter);
   }
   
   building2 = this.buildingGroup.getRandom();
   MM.positionAllOffscreenRandomly(this.game);
   MM.setAllGoal(building2.centerX, building2.centerY, 0.4);
   console.log("BUILDING LOC: ", building2.x, building2.y);

 
   // Create UI
   this.pointer = this.game.add.sprite(0, 0, 'assets','crosshair');
   this.pointer.anchor.set(0.5,0.5);
   this.waterUI = new WaterUI(this.game,this.player,70,60);
   this.fireUI = new FireUI(this.game,this.buildingGroup,765,355);
     
     this.end = damageFire = function(particle,building){
      particle.kill();
      building.damageFire();
   }
   // Debug Keys
	this.G = this.game.input.keyboard.addKey(Phaser.Keyboard.G);

	// Functions
	  game = this.game; //temp solution until I can figure out a better way to refernce game
   var throwAtBuilding2 = function(mob){
      //mob.freeze();
      mob.fireAtBuilding(game, building2);
      mob.setGoalPoint(game.world.centerX, game.world.centerY, 0.5);
      //tObject = new ThrownObject(game, {key: "moltav", frame: 0}, mob.centerX, mob.centerY);
   };

   var onSprayIncreaseGoalweight = function(mob){
      //mob.freeze();
      mob.setGoalPoint(mob.primaryGoalX, mob.primaryGoalY, (mob.goalVectorWeight + 0.02));
      //tObject = new ThrownObject(game, {key: "moltav", frame: 0}, mob.centerX, mob.centerY);
   };

   MM.addAllTriggerOnEntry(building2.x-(building2.width/2)-60, building2.y - (building2.height/2)- 60, building2.width+120, building2.height + 120, throwAtBuilding2);
   //This is for top left corner handle --> MM.addAllTriggerOnEntry(building2.x-60, building2.y - 60, building2.width+120, building2.height + 120, throwAtBuilding2);
   // The less movable an object is, the further down the list it should be
   MM.addAllTriggerOnCollision(this.emitter, onSprayIncreaseGoalweight, false);
   MM.addAllTriggerOnCollision(this.player);
   MM.addAllTriggerOnCollision(this.hydrantGroup, null, false);
   MM.addAllTriggerOnCollision(this.buildingGroup, null, false);


   },//end_create

   update: function(){
// Debug to end game
   if (this.G.isDown){
      this.state.start("stGameOver");
   }

   // start UI update functions
   MM.update(this.game);
	this.waterUI.update();
	this.fireUI.update();

	// - Collisions -
	// Buildings
	this.game.physics.arcade.collide(this.emitter, this.buildingGroup,this.emitter.buildingCollision); // emitter with buildings
	this.game.physics.arcade.collide(this.player, this.buildingGroup); // player with buildings

	// Fires
	this.buildingGroup.forEach(function(building){
		this.game.physics.arcade.overlap(this.emitter,building.fireGroup,building.damageFire); // emitter with fire
	},this);
	
	//cursor
	this.pointer.x = this.game.camera.x + this.game.input.x -0;
	this.pointer.y = this.game.camera.y + this.game.input.y -0;

   },//end_update

 /*  render: function() {
	   this.buildingGroup.forEach(function(building){
		   building.fireGroup.forEach(function(fire){
			   this.game.debug.body(fire);
		   },this);
	   },this);
   // display fps
    //  this.game.debug.text('FPS: ' + this.game.time.fps, 20, 580, 'yellow');
   }*/
};//end_s1Game
