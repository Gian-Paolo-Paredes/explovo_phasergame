//logging functionality
function l(itemToLog){
   if(typeof(itemToLog)==Object){
      console.log(JSON.stringify(itemToLog));
   }else{
      console.log(itemToLog);
   }
}

function transformOverAngle(angle, x, y){
   //angle given in radians
   cosine = Math.cos(angle);
   sine = Math.sin(angle);
   xprime = (cosine*x)+(-1*(sine*y));
   yprime = (sine*x)+(cosine*y);
   var returnObj = {x: xprime, y: yprime};
   return returnObj;
}

var GameTime;
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
      this.load.images(["Player", "Particle"], ["Firefighter.png", "WFParticle.png"]);

      //load the atlas
      this.load.atlas("atlas", "atlas.png", "atlas.json", Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

   },//end_preload
   create: function(){
      l("PreloadAssets_create");
      this.state.start("stGame");
   },//end_create
};

//Main Game State
GameContainer.stGame = function() {

};
GameContainer.stGame.prototype = {
   preload: function(){
      game.time.advancedTiming = true;


   },//end_preload
   create: function() {
      player = this.add.sprite(game.world.centerX, game.world.centerY, "Player");
      player.anchor.set(0.5);

      game.physics.arcade.enable(player);
      player.enableBody = true;
      player.collideWorldBounds = true;

      player.rotation = game.physics.arcade.angleToPointer(player);

      emitter = game.add.emitter(0, 0, 1000, true, false); //positionx, positiony, numberparticles, collide arcade, collide world
      this.world.moveDown(emitter);


      emitter.makeParticles('Particle');

      emitter.forEach(function(particle) {
         particle.body.allowGravity = false;
      }, this);

      var offset = Math.sqrt(Math.pow(game.input.mousePointer.x-emitter.x, 2)+Math.pow(game.input.mousePointer.y-emitter.y, 2));
      l(offset);

      emitter.lifespan = 1000;


      emitter.maxParticleSpeed = new Phaser.Point(game.input.mousePointer.x-emitter.x+offset, game.input.mousePointer.y-emitter.y+offset);
      emitter.minParticleSpeed = new Phaser.Point(game.input.mousePointer.x-emitter.x-offset, game.input.mousePointer.y-emitter.y-offset);

      //emitter.minParticleSpeed = new Phaser.Point(200,-50);

   },//end_create
   update: function(){
      player.rotation = game.physics.arcade.angleToPointer(player);
      //l("rotation:" + player.rotation);






   if (game.input.activePointer.isDown){

      offsetMax = 200;
      offsetMin = 80;
      offsetNarrowing = 0.5;
      offsetNoise = 10;
      emitterSpriteOffsetX = 25;
      emitterSpriteOffsetY = 15;

      emitter.y = player.y + transformOverAngle(player.rotation, emitterSpriteOffsetX, emitterSpriteOffsetY).y;
      emitter.x = player.x + transformOverAngle(player.rotation, emitterSpriteOffsetX, emitterSpriteOffsetY).x;

      var offset = Math.sqrt(Math.pow(game.input.mousePointer.x-emitter.x, 2)+Math.pow(game.input.mousePointer.y-emitter.y, 2));
      if (offset > offsetMax){
         offset = offsetMax;
      }else if(offset < offsetMin){
         offset = offsetMin;
      }
      offset = offsetNarrowing*(offsetMax-offset) + offsetNoise;
      l(offset);

      emitter.lifespan = 800 + (1/offsetNarrowing)*offset;

      emitter.maxParticleSpeed = new Phaser.Point(game.input.mousePointer.x-emitter.x+offset, game.input.mousePointer.y-emitter.y+offset);
      emitter.minParticleSpeed = new Phaser.Point(game.input.mousePointer.x-emitter.x-offset, game.input.mousePointer.y-emitter.y-offset);

      emitter.emitParticle();
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
