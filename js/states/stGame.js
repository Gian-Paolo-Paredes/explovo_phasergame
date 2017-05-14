//Main this.game State
var stGame = function(game) {
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

};
stGame.prototype = {
   preload: function(){
      this.game.time.advancedTiming = true;

   },//end_preload
   create: function() {

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

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
         // a "this.game feel" variable that both affects distance and where the cursor should be
         //    positioned to achieve a certain distance with the particles. Phaser does not seem
         //    to have particle limiting by distance so keep this value at 4 for now.
         waterParticleLifetimeConstant = 4;

      //test sprite functionality, player added here
      player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "Player");
      player.anchor.set(0.5);

      this.game.physics.arcade.enable(player);
      player.enableBody = true;
      player.collideWorldBounds = true;

      player.rotation = this.game.physics.arcade.angleToPointer(player);

      cursors = this.game.input.keyboard.createCursorKeys();

      //--/ creating the water particle emitter
      emitter = this.game.add.emitter(this.game, 0, 0);

      this.world.moveDown(emitter);

      //(String or array of strings for particles to be used, frames the sprite uses, number of particles to generate, arcade collision, world bounds collision)
      emitter.makeParticles('Particle', 0, 1000, true, false);

      emitter.forEach(function(particle) {
         particle.enableBody = true;
         particle.body.allowGravity = false;
      }, this);

      // test particle collision functionality, building added here
       building = this.add.sprite(this.game.world.centerX/2, this.game.world.centerY, "Test_Building1");
       building.anchor.set(0.5);
       this.game.physics.arcade.enable(building);
       building.enableBody = true;
       building.body.immovable = true;

       building2 = this.add.sprite(this.game.world.centerX*1.5, this.game.world.centerY, "Test_Building1");
       building2.anchor.set(0.5);
       this.game.physics.arcade.enable(building2);
       building2.enableBody = true;
       building2.body.immovable = true;

   //--/ UI implementation
      this.Fires = this.game.add.image(765,335,'FireLevel');
      this.Fires.anchor.set(0.5,1);
      this.add.image(724,50,'FireBar');
      //water bar // will conect to clicks
      this.Waters = this.game.add.image(70,60,'WaterLevel');	
      this.add.image(20,20,'WaterBar');
      this.Waters.anchor.set(0,0.5);

      //test input
      waterDrain = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      waterRefill = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      FireFall = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

      particleBuildingOnCollision = function(building, particle){
         particle.kill();

      };

   },//end_create
   update: function(){
      player.rotation = this.game.physics.arcade.angleToPointer(player);

   if (this.game.input.activePointer.isDown){

      emitter.y = player.y + transformOverAngle(player.rotation, emitterSpriteOffsetX, emitterSpriteOffsetY).y;
      emitter.x = player.x + transformOverAngle(player.rotation, emitterSpriteOffsetX, emitterSpriteOffsetY).x;

      distMouseCursorToEmitter = distanceBetween(this.game.input.mousePointer.x, this.game.input.mousePointer.y, emitter.x, emitter.y);

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
         emitterToMouseDistanceX = similarTriangleProportion*(this.game.input.mousePointer.x-emitter.x);
         emitterToMouseDistanceY = similarTriangleProportion*(this.game.input.mousePointer.y-emitter.y);
      }else{
         emitterToMouseDistanceX = this.game.input.mousePointer.x-emitter.x;
         emitterToMouseDistanceY = this.game.input.mousePointer.y-emitter.y;
      }

      emitter.maxParticleSpeed = new Phaser.Point(emitterToMouseDistanceX+particleVelocityOffset, emitterToMouseDistanceY+particleVelocityOffset);
      emitter.minParticleSpeed = new Phaser.Point(emitterToMouseDistanceX-particleVelocityOffset,emitterToMouseDistanceY-particleVelocityOffset);

      emitter.emitParticle();

   }

   this.game.physics.arcade.collide(emitter, building, particleBuildingOnCollision);
   this.game.physics.arcade.collide(player, building);

   this.game.physics.arcade.collide(emitter, building2, particleBuildingOnCollision);
   this.game.physics.arcade.collide(player, building2);



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


//TEST UI Functionality
   if (waterDrain.isDown){
      this.Waters.scale.x -= 0.005;		
   }
   if(this.Waters.scale.x<0){
      this.Waters.scale.x=0;
   }	

   if(waterRefill.isDown){
      this.Waters.scale.x += 0.005;
   }
   if(this.Waters.scale.x>1){
      this.Waters.scale.x=1;
   }

   //scaling the fire level
   if (FireFall.isDown){
      this.Fires.scale.y -= 0.005;		
   }
   if(this.Fires.scale.y<0){
      this.Fires.scale.y=0;
      //console.log('Gameover');
   }




   },//end_update
   render: function() {
   // display fps
      this.game.debug.text('FPS: ' + this.game.time.fps, 20, 580, 'yellow');
   }
};//end_s1Game