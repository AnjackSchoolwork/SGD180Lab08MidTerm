// All items inherit from this
class baseItem {

	constructor() {

	}

	passiveEffect() {
		
	}
	
	activeEffect() {
		
	}
}


// All entities inherit from this
class baseEnt {

	constructor(x_pos, y_pos, sprite_image) {
		// Percentage-based?
		this.health = 100
		
		// Inventory is object containing keys which are object names
		// and values which are objects defining what the object does.
		// Each inventory object will have a passiveEffect method and
		// an activeEffect method. 
		// passiveEffect methods are run every tick
		// activeEffect methods are run on use (predefined use key 
		// when item is selected/equipped)
		this.inventory = {}

		// Default to canvas origin
		this.position = {
			// If null, set coordinates to 0
			"x": x_pos == null ? 0 : x_pos,
			"y": y_pos == null ? 0 : y_pos
		}

		// Empty sprite by default
		this.sprite_img = new Sprite(sprite_image)
	}

	get Health() {
		return this.health
	}

	set Health(new_value) {
		// TODO: Validation
		this.health = new_value
		return true
	}

	changeHealth(increment_value) {
		// TODO: Validation
		this.health += increment_value
		return true
	}

	get Inventory() {
		return this.inventory
	}

	addToInventory(item_name, item_object) {
		// TODO: Validation
		try {
			this.inventory[item_name] = item_object
			return true
		}
		catch (e) {
			return false
		}
	}

	removeFromInventory(item_name) {
		try {
			delete this.inventory[item_name]
		}
		catch (e) {
			// TODO: Handle specific errors
			return false
		}
	}

	get Position() {
		return this.position
	}

	set Position(new_position) {
		// TODO: Validation
		this.position = new_position
	}

	get Sprite() {
		return this.sprite_img
	}

	set Sprite(new_image) {
		// TODO: Validation
		this.sprite_img = new_image
	}

	// Redraw sprites, update positions
	Update() {
		this.sprite_img.Update()
	}
}

// Mob is a type of entity
class baseMob extends baseEnt {

	constructor() {
		super(arguments[0], arguments[1], arguments[2])

		// Move speed
		this.move_increment = 10

		// Move?
		this.move_vectors = {
			"x_left": 0,
			"x_right": 0,
			"y_up": 0,
			"y_down": 0,
			"x": 0,
			"y": 0
		}

	}

	Update() {
		super.Update()
		this.Move()
	}

	Move() {
		this.move_vectors.x = this.move_vectors.x_left + this.move_vectors.x_right
		this.move_vectors.y = this.move_vectors.y_up + this.move_vectors.y_down
		if (this.move_vectors.x != 0) {
			this.moveX(this.move_vectors.x)
			console.log(this.move_vectors)
		}

	}

	// Return true if we've collided with something, false otherwise
	Collided() {

		// Handle colliding with map.

	}
}

// Player is a type of mob
class Player extends baseMob {

	constructor() {
		super(arguments[0], arguments[1], arguments[2])
		this.loadConfig()
		this.hookControls()
	}

	loadConfig() {
		// TODO: Make better
		// Temporary hardcode

		// Control keyCodes
		this.keys = {
			"left": 65,
			"right": 68,
			"jump": 32
		}

	}

	Update() {
		super.Update()
		this.Sprite.Update()
	}

	hookControls() {
		var calling_obj = this
		document.addEventListener("keydown", function (e) {
			calling_obj.inputHandler(e, "down")
		})
		document.addEventListener("keyup", function (e) {
			calling_obj.inputHandler(e, "up")
		})
	}

	inputHandler(e, direction) {
		//TODO: Need to check for multiple simultaneous keypresses.
		switch (direction) {
			case ("down"):
				if (e.keyCode == this.keys.left) {
					this.move_vectors.x_left = -this.move_increment
				}
				else if (e.keyCode == this.keys.right) {
					this.move_vectors.x_right = this.move_increment
				}
				break
			case ("up"):
				if (e.keyCode == this.keys.left) {
					this.move_vectors.x_left = 0
				}
				else if(e.keyCode == this.keys.right) {
					this.move_vectors.x_right = 0
				}
				break
		}
	}

	moveX(dist_to_move) {

		this.position.x += dist_to_move
	}

	moveY() {

	}
}

class Sprite {

	constructor(sprite_image) {
		if (sprite_image != null) {
			// Create an image element and store it
			this.img = document.createElement("img")
			this.img.src = sprite_image
		}
		else {
			// Use default placeholder sprite
		}
	}

	Update() {

	}
}

class Scene {
	constructor(reference_to_canvas) {
		this.ctx = reference_to_canvas.getContext("2d")
		this.actor_list = []
	}

	addActor(actor_to_add) {
		// TODO: validate
		this.actor_list.push(actor_to_add)
	}

	removeActor(actor_to_remove) {

	}

	get actorList() {

	}

	drawActor(actor_to_draw) {
		this.ctx.drawImage(actor_to_draw.Sprite.img, actor_to_draw.position.x, actor_to_draw.position.y)
	}

	Update() {
		this.clearCanvas()
		this.updateScene()
		this.drawScene()
	}

	// Draw blankness
	clearCanvas() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
	}

	updateScene() {
		for (var index in this.actor_list) {
			this.actor_list[index].Update()
		}
	}

	// Draw everything in current scene
	drawScene() {
		for (var index in this.actor_list) {
			this.drawActor(this.actor_list[index])
		}
	}

	// Returns a static image of the scene in its current state
	getStaticScene() {

	}
}

class Map {

	constructor(reference_to_canvas) {
		this.ctx = reference_to_canvas.getContext("2d")
	}

	getSpriteOverlap(x_pos, y_pos, width, height) {
		return this.ctx.getImageData(x_pos, y_pos, x_pos + width, y_pos + height)
	}
}