<<<<<<< HEAD
=======
window.onload = function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO);
	game.state.add("stBoot", stBoot);
	game.state.add("stPreloader", stPreloader);
	game.state.add("stGame", stGame);
	//start the first state
	game.state.start("stBoot");
}
>>>>>>> 19d04dc74f896163e91861b7fbb8fce89b0c0e9b
