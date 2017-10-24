// Global game state
game_state = 0

// Initialization and game loop

function Setup(canvas) {
	var scene = new Scene(canvas)

	var thePlayer = new Player(400, 300, "img/jonesy.png")

	scene.addActor(thePlayer)

	scene.Update()
	setInterval(function () { gameLoop(scene) }, 30)
}

function gameLoop(scene) {
	if (game_state == game_states.playing) {
		scene.Update()
	}
}

game_states = {
	"menu": 0,
	"playing": 1,
	"paused": 2
}