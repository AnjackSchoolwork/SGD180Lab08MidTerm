// Global game state
game_state = 0

// Initialization and game loop

function Setup(scene_canvas, map_canvas) {
	scene = new Scene(scene_canvas, map_canvas)

	thePlayer = new Player(400, 300, "img/jonesy.png")

	scene.addActor(thePlayer)
	
	setInterval(function () { gameLoop(scene) }, 30)
}

function gameLoop(scene) {
	if (game_state == game_states.playing) {
		scene.Update(scene)
	}
}

game_states = {
	"menu": 0,
	"playing": 1,
	"paused": 2
}