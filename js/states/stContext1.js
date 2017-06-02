//Instructions Page
var news;
var rotate;
var i;
var stContext1 = function(game) {
};
stContext1.prototype = {
    preload: function(){
        l("Directions_preload");
        // add in background
        
    },//end_preload
    create: function(){
       l("Directions_create");
       sfx= this.game.add.audio("whirling");

       sfx.play();
        // add in start button 
        rotate=0;
        

        news = this.game.add.image(this.game.width/2, this.game.height/2, 'News1');
        news.anchor.set(0.5,0.5);
        news.scale.setTo(0.1,0.1);

        this.game.add.tween(news).to( { angle: 720 }, 900, Phaser.Easing.Linear.None, true);
        this.game.add.tween(news.scale).to( { x: 1, y: 1 }, 1200, Phaser.Easing.Linear.None, true);

     
        var button = this.game.add.button(this.game.width/2, this.game.height - 120, 'NextButtons', this.startGame, this.game,'ContinueButtonOver', 'ContinueButton');
        button.anchor.set(0.5);
        button.scale.setTo(0.4,0.4);
        button.onInputOver.add(this.over, this);
        button.onInputOut.add(this.out, this);  
        
    },//end_create
    update: function(){
   
    },
    over: function() {
        l("over");

    },//end_over
    out: function() {
        l("out");
        
    },//end_out
    startGame: function() {
<<<<<<< HEAD
        this.state.start("stGame");
=======
<<<<<<< HEAD
        this.state.start("stGame");
=======
        this.state.start("stContext2");
>>>>>>> 7e90a3ff816f80ae3b539655b64e5f9252f9e6f5
>>>>>>> 4ad041e41fe90ba58d37c72f4c324b7c20f5c02d
    }//end_startGame
};
