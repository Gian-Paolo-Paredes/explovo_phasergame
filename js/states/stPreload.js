// Preloader state
// Loads assets
var stPreload = function(game) {
};
stPreload.prototype = {
    preload: function(){
        l("preloader_preload");
        //---/ load all assets
        //load non-atlas assets
<<<<<<< HEAD
        
=======
        this.load.images(["Player", "Particle", "Test_Building1", "Test_Building2"], ["Firefighter1.png", "WaFParticle.png", "proto_Build12.png", "Building1-FinalBurn.png"]);
>>>>>>> 4ad041e41fe90ba58d37c72f4c324b7c20f5c02d
        this.load.image('WaterBar','CMPM120(WaterUI-257X84px).png');
        this.load.image('WaterLevel','CMPM120(WaterLevelUI197x35px).png');
        this.load.image('FireBar','CityLife.png');
        this.load.image('FireLevel','(FireLevel-29x277).png');
        this.load.image('TitleScreen', 'riotfighter-titlescreen.png');
<<<<<<< HEAD
	this.load.image('building','proto_Build1.png');
        this.load.image('buildingDestroyed','Building1-FinalBurn.png');
	this.load.image('fire','FireSprite1.png');
	this.load.image('hydrant','FireHydrant.png');
         this.load.image('waterArrow', 'WaterArrow.png');
         this.load.image('fireArrow', 'FireArrow.png');
         this.load.images(["Player", "Particle", "Test_Building1", "Test_Building2"], ["Firefighter1.png", "WaFParticle.png", "proto_Build12.png", "Building1-FinalBurn.png"]);
         this.load.image('fireCount', 'FireCounter.png')
         this.load.image('BLANK', 'Blank.png')
=======
		this.load.image('building','proto_Build1.png');
		this.load.image('buildingDestroyed','Building1-FinalBurn.png');
		this.load.image('fire','FireSprite1.png');
		this.load.image('hydrant','FireHydrant.png');
>>>>>>> 4ad041e41fe90ba58d37c72f4c324b7c20f5c02d

        this.load.image('DirectPage','DirectionsPage.png');
        this.load.image('News1', "News1.png");
        this.load.image('News2', "News2.png");
        this.load.image('News3', "News3.png");
        
      //  this.load.atlas('StartButtons', 'buttonsheet.png', 'buttonsheet.json');

        this.load.image('GameOverPage',"GameOverScreen.png");
        
        this.load.atlas('StartButtons', 'buttonsheet.png', 'buttonsheet.json');

<<<<<<< HEAD
        this.load.atlas('Flame','Fires.png','FiresAtlas.json');
        this.load.atlas('Explosion','Exlposion.png','Explosion.json');

=======
>>>>>>> 4ad041e41fe90ba58d37c72f4c324b7c20f5c02d
        this.load.atlas('NextButtons', 'ContinueButtons.png', 'ContinueButtons.json');
        this.game.load.audio("whirling", 'audio/newstransition.mp3');
        
        this.game.load.tilemap('tilemap', 'tiles/MapTile.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('TileAtlas', 'tiles/TileAtlas.png');
<<<<<<< HEAD

        
	this.load.path="assets/tilemap/";
	this.game.load.image('bg','tiledmap.png');

         
=======
		this.load.path="assets/tilemap/";
		this.game.load.image('bg','tiledmap.png');
>>>>>>> 4ad041e41fe90ba58d37c72f4c324b7c20f5c02d

        
          
        //load assets from atlas (if applicable)

   },//end_preload
   create: function(){
        l("PreloadAssets_create");
        this.state.start("stTitle");
   },//end_create
};
