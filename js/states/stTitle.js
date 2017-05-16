// Title state
// Loads assets
var stTitle = function(game) {
};
stPreload.prototype = {
    preload: function(){
        l("title_preload");


   },//end_preload
   create: function(){
        l("title_create");
        this.state.start("stTitle");
   },//end_create
};
