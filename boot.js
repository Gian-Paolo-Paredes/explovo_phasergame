// Boot state (preloader?)
// State for loading the game
var boot = function(game){
};
boot.prototype = {
	init: function(){
		l("boot_init");
		this.stage.disableVisibilityChange = true;
	},
	preload: function(){
		this.load.path="assets/img/";
	},
	create: function(){
      this.state.start("stPreloadAssets");
	}
};