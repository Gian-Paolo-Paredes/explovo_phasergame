// Preloader state
// Loads assets
var stPreload = function(game) {
};
stPreload.prototype = {
   preload: function(){
      l("preloader_preload");
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
