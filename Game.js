// Initialization and game loop

function Setup(canvas) {
	scene = new Scene(canvas)

	thePlayer = new Player(400, 300, "img/jonesy.png")

	scene.addActor(thePlayer)

	scene.Update()
	//setInterval(function () { gameLoop() }, 30)
}

function gameLoop() {
	scene.Update()
}

