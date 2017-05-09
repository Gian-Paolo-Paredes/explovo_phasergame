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

   },//end_create
   update: function(){

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
