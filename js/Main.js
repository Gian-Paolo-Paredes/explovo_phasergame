var GameContainer = { };

//---/Game States
// Boot State
GameContainer.stBoot = function() {};
GameContainer.stBoot.prototype = {
   init: function(){
      l("boot_init");
      this.stage.disableVisibilityChange = true;
   },//end_init
   preload: function(){
      l("boot_preload");
      this.load.path="assets/img/"; //sets initial load path to images folder
   },//end_preload
   create: function(){
      this.state.start("stPreloadAssets");
   }//end_create
};

// Asset Preload State
GameContainer.stPreloadAssets = function() {

};
GameContainer.stPreloadAssets.prototype = {
   preload: function(){
      l("PreloadAssets_preload");

      //---/ load all assets
      //load non-atlas assets
      this.load.images(["Player", "Particle", "Test_Building1", "Test_Building2"], ["Firefighter.png", "WFParticle.png", "proto_Build1.png", "proto_Build2.png"]);

      //load assets from atlas (if applicable)


   },//end_preload
   create: function(){
      l("PreloadAssets_create");
      this.state.start("stGame");
   },//end_create
};

//Main Game State
GameContainer.stGame = function() {

      var waterStreamMaxDistance;
      var particleVelocityOffsetMax;
      var particleVelocityOffsetMin;
      var particleVelocityOffsetNarrowing;
      var particleVelocityOffsetNoise;
      var emitterSpriteOffsetX;
      var emitterSpriteOffsetY;

      var particleVelocityOffset;
      var distMouseCursorToEmitter;
      var waterParticleLifetimeConstant;


      var particleBuildingOnCollision;

};
GameContainer.stGame.prototype = {
   preload: function(){
      game.time.advancedTiming = true;

   },//end_preload
   create: function() {

      game.physics.startSystem(Phaser.Physics.ARCADE);

   //--/ variable assignments
      //--/ water particle emitter variables
         //Max distance the stream of water reaches
         waterStreamMaxDistance = 250; //250 seems optimal for a 600 by 800 screen
         //particleVelocityOffset is the distance of the player to the mouse cursor; Max and min limit that distance
         particleVelocityOffsetMax = 200;
         particleVelocityOffsetMin = 80;
         //narrowing
         particleVelocityOffsetNarrowing = 0.5;
         // adds left-right variation in the longest possible stream of particles to resemble a jet of water
         particleVelocityOffsetNoise = 10;
         //the location in pixels from the center of the sprite (0, 0) to the location of the emitter
         //    used to calculate new positions for the emitter as player rotates
         emitterSpriteOffsetX = 25;
         emitterSpriteOffsetY = 15;
         // a "game feel" variable that both affects distance and where the cursor should be
         //    positioned to achieve a certain distance with the particles. Phaser does not seem
         //    to have particle limiting by distance so keep this value at 4 for now.
         waterParticleLifetimeConstant = 4;

      //test sprite functionality, player added here
      player = this.add.sprite(game.world.centerX, game.world.centerY, "Player");
      player.anchor.set(0.5);

      game.physics.arcade.enable(player);
      player.enableBody = true;
      player.collideWorldBounds = true;

      player.rotation = game.physics.arcade.angleToPointer(player);

      cursors = game.input.keyboard.createCursorKeys();

      //--/ creating the water particle emitter
      emitter = game.add.emitter(game, 0, 0);

      this.world.moveDown(emitter);

      //(String or array of strings for particles to be used, frames the sprite uses, number of particles to generate, arcade collision, world bounds collision)
      emitter.makeParticles('Particle', 0, 1000, true, false);

      emitter.forEach(function(particle) {
         particle.enableBody = true;
         particle.body.allowGravity = false;
      }, this);

      // test particle collision functionality, building added here
       building = this.add.sprite(game.world.centerX/2, game.world.centerY, "Test_Building1");
       building.anchor.set(0.5);
       game.physics.arcade.enable(building);
       building.enableBody = true;
       building.body.immovable = true;

       building2 = this.add.sprite(game.world.centerX*1.5, game.world.centerY, "Test_Building1");
       building2.anchor.set(0.5);
       game.physics.arcade.enable(building2);
       building2.enableBody = true;
       building2.body.immovable = true;


      particleBuildingOnCollision = function(building, particle){
         particle.kill();

      };

   },//end_create
   update: function(){
      player.rotation = game.physics.arcade.angleToPointer(player);

   if (game.input.activePointer.isDown){

      emitter.y = player.y + transformOverAngle(player.rotation, emitterSpriteOffsetX, emitterSpriteOffsetY).y;
      emitter.x = player.x + transformOverAngle(player.rotation, emitterSpriteOffsetX, emitterSpriteOffsetY).x;

      distMouseCursorToEmitter = distanceBetween(game.input.mousePointer.x, game.input.mousePointer.y, emitter.x, emitter.y);

      // handles the "spread" of water particles (the further you aim the narrower the stream)
      particleVelocityOffset = distMouseCursorToEmitter ;
      if (particleVelocityOffset > particleVelocityOffsetMax){
         particleVelocityOffset = particleVelocityOffsetMax;
      }else if(particleVelocityOffset < particleVelocityOffsetMin){
         particleVelocityOffset = particleVelocityOffsetMin;
      }
      particleVelocityOffset = particleVelocityOffsetNarrowing*(particleVelocityOffsetMax-particleVelocityOffset) + particleVelocityOffsetNoise;

      emitter.lifespan = waterStreamMaxDistance*waterParticleLifetimeConstant;

      if(distMouseCursorToEmitter > waterStreamMaxDistance){
         var similarTriangleProportion = waterStreamMaxDistance/distMouseCursorToEmitter;
         emitterToMouseDistanceX = similarTriangleProportion*(game.input.mousePointer.x-emitter.x);
         emitterToMouseDistanceY = similarTriangleProportion*(game.input.mousePointer.y-emitter.y);
      }else{
         emitterToMouseDistanceX = game.input.mousePointer.x-emitter.x;
         emitterToMouseDistanceY = game.input.mousePointer.y-emitter.y;
      }

      emitter.maxParticleSpeed = new Phaser.Point(emitterToMouseDistanceX+particleVelocityOffset, emitterToMouseDistanceY+particleVelocityOffset);
      emitter.minParticleSpeed = new Phaser.Point(emitterToMouseDistanceX-particleVelocityOffset,emitterToMouseDistanceY-particleVelocityOffset);

      emitter.emitParticle();

   }

   game.physics.arcade.collide(emitter, building, particleBuildingOnCollision);
   game.physics.arcade.collide(player, building);

   game.physics.arcade.collide(emitter, building2, particleBuildingOnCollision);
   game.physics.arcade.collide(player, building2);



//TEST player movement functionality
//every frame reset player velocity in the x direction
player.body.velocity.x = 0;
player.body.velocity.y = 0;
//if the left arrow key is pressed change player velocity to 150 left
   if(cursors.left.isDown){
      player.body.velocity.x = -150;
   }else if(cursors.right.isDown){
      player.body.velocity.x = 150;
   }else if(cursors.up.isDown){
      player.body.velocity.y = -150;
   }else if(cursors.down.isDown){
      player.body.velocity.y = 150;
   }



   },//end_update
   render: function() {
   // display fps
      game.debug.text('FPS: ' + game.time.fps, 20, 580, 'yellow');
   }
};//end_s1Game

//sets width and height of game to avaliable width and height
var game = new Phaser.Game(800, 600, Phaser.AUTO);

//add the game states to the game object
game.state.add("stBoot", GameContainer.stBoot);
game.state.add("stPreloadAssets", GameContainer.stPreloadAssets);
game.state.add("stGame", GameContainer.stGame);
//start the first state
game.state.start("stBoot");
