// Title state
// Title screen
var stTitle = function(game) {
};
stTitle.prototype = {
    preload: function(){
        l("title_preload");
        // add in background
        this.game.add.image(0, 0, 'TitleScreen');
        
    },//end_preload
    create: function(){
        l("title_create");
        // add in start button 
        var button = this.game.add.button(this.game.width/2, this.game.height - 186, 'StartButtons', this.startGame, this.game, 'riotfighter-title-button2', 'riotfighter-title-button');
        button.anchor.set(0.5);
        
        button.onInputOver.add(this.over, this);
        button.onInputOut.add(this.out, this);  
        
    },//end_create
    over: function() {
        l("over");

    },//end_over
    out: function() {
        l("out");
        
    },//end_out
    startGame: function() {
<<<<<<< HEAD
        //this.state.start("stDirections");
  this.state.start("stGame");      
=======
<<<<<<< HEAD
        this.state.start("stDirections");
=======
        this.state.start("stContext1");
>>>>>>> 7e90a3ff816f80ae3b539655b64e5f9252f9e6f5
>>>>>>> 4ad041e41fe90ba58d37c72f4c324b7c20f5c02d
    }//end_startGame
};
