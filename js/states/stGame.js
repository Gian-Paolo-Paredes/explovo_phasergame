//Main Game State
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
      player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "Player");
      player.anchor.set(0.5);

      this.game.physics.arcade.enable(player);
      player.enableBody = true;
      player.collideWorldBounds = true;

      player.rotation = this.game.physics.arcade.angleToPointer(player);


      //--/ creating the water particle emitter
      emitter = this.game.add.emitter(0, 0, 1200, true, false); //positionx, positiony, numberparticles, collide arcade, collide world
      this.world.moveDown(emitter);

      emitter.makeParticles('Particle');

      emitter.forEach(function(particle) {
         particle.body.allowGravity = false;
      }, this);

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

      //l("particleVelocityOffset: " + particleVelocityOffset);

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

   },//end_update
   render: function() {
   // display fps
      this.game.debug.text('FPS: ' + this.game.time.fps, 20, 580, 'yellow');
   }
};//end_s1Game