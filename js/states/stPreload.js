// Preloader state
// Loads assets
var stPreload = function(game) {
};
stPreload.prototype = {
    preload: function(){
        l("preloader_preload");
        //---/ load all assets
        //load non-atlas assets

        this.load.images(["Player", "Particle", "Test_Building1", "Test_Building2"], ["Firefighter1.png", "WaFParticle.png", "proto_Build12.png", "Building1-FinalBurn.png"]);

        this.load.image('WaterBar','CMPM120(WaterUI-257X84px).png');
        this.load.image('WaterLevel','CMPM120(WaterLevelUI197x35px).png');
        this.load.image('FireBar','CityLife.png');
        this.load.image('FireLevel','(FireLevel-29x277).png');
        this.load.image('TitleScreen', 'riotfighter-titlescreen.png');

	this.load.image('building','proto_Build1.png');
        this.load.image('buildingDestroyed','Building1-FinalBurn.png');
	this.load.image('fire','FireSprite1.png');
	this.load.image('hydrant','FireHydrant.png');
        
        this.load.image('building','proto_Build1.png');
        this.load.image('fire','Fire3.png');
        this.load.image('buildingDestroyed','Building1-FinalBurn.png');
        this.load.image('hydrant','FireHydrant.png');
      this.load.image('waterArrow', 'WaterArrow.png');
        this.load.image('fireArrow', 'FireArrow.png');
       
        this.load.image('fireCount', 'FireCounter.png');
        this.load.image('BLANK', 'Blank.png');
      
        this.load.image('DirectPage','DirectionsPage.png');
        this.load.image('News1', "News1.png");
        this.load.image('News2', "News2.png");
        this.load.image('News3', "News3.png");

        this.load.image('moltav','Moltav.png');
        this.load.image('rioter','Rioter.png');
        this.load.image('foam','WFParticle.png')
        this.load.image('indi', 'fireIndicator.png');

        //  this.load.atlas('StartButtons', 'buttonsheet.png', 'buttonsheet.json');

        this.load.image('GameOverPage',"GameOverScreen.png");

        this.load.atlas('StartButtons', 'buttonsheet.png', 'buttonsheet.json');


        this.load.atlas('fires','Fires.png','FiresAtlas.json');
              this.load.atlas('Explosion','Exlposion.png','Explosion.json');
         this.load.atlas('TitleAnimation',"TitleAnimation.png","TitleAnimation.json");

        this.load.atlas('NextButtons', 'ContinueButtons.png', 'ContinueButtons.json');
        this.game.load.audio("whirling", 'audio/newstransition.mp3');

        this.game.load.tilemap('tilemap', 'tiles/MapTile.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('TileAtlas', 'tiles/TileAtlas.png');

        this.load.path="assets/tilemap/";
        this.game.load.image('bg','tiledmap.png');

        //load assets from atlas (if applicable)

        //load audio assets
        this.load.path = "assets/audio/"
        this.load.audio('title_screen', 'title screen.mp3');
        this.load.audio('game_music', 'game music.mp3');
        this.load.audio('water_spray', 'water_spray.mp3');
        this.load.audio('water_end', 'water_end.mp3');
        this.load.audio('water_out1', 'water_out1.mp3');
        this.load.audio('water_out2', 'water_out2.mp3');
        this.load.audio('refill_start', 'refill_start.mp3');
        this.load.audio('refill', 'refill.mp3');
        this.load.audio('refill_done', 'refill_done.mp3');
        this.load.audio('refill_notdone', 'refill_notdone.mp3');
        this.load.audio('fireSizzle','sizzle.wav')
    
    },//end_preload
    create: function(){
        l("PreloadAssets_create");
        this.game.sound.setDecodedCallback(['title_screen', 'game_music'], this.start, this);
    },//end_create
    start: function(){
         this.state.start("stTitle");
    }, //end_start
};
