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

		// TODO: Move this to Draw method
		this.sprite_img.Update()
	}

	Draw(scene) {
		scene.ctx.drawImage(this.Sprite.img, this.position.x, this.position.y)
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

	Update(reference_to_scene) {
		super.Update(reference_to_scene)

		// Update vector sums
		this.move_vectors.x = this.move_vectors.x_left + this.move_vectors.x_right
		this.move_vectors.y = this.move_vectors.y_up + this.move_vectors.y_down

		if (!this.Collided(reference_to_scene)) {
			this.Move()
		}
	}

	Move() {
		if (this.move_vectors.x != 0) {
			this.moveX(this.move_vectors.x)
		}

	}

	moveX(dist_to_move) {

		this.position.x += dist_to_move
	}

	moveY() {

	}

	// Return true if we've collided with something, false otherwise
	Collided(scene) {
		// TODO: Better

		// Handle colliding with map.
		var temp_canvas = document.createElement("canvas")
		temp_canvas.height = this.Sprite.img.height
		temp_canvas.width = this.Sprite.img.width
		var temp_context = temp_canvas.getContext("2d")
		temp_context.drawImage(this.Sprite.img, 0, 0)
		
		var sprite_image = temp_context.getImageData(0, 0, temp_canvas.width, temp_canvas.height).data
		
		var overlap_image_raw = scene.map.getSpriteOverlap(this.position.x, this.position.y, this.Sprite.img.width, this.Sprite.img.height)
		var overlap_image = overlap_image_raw.data

		var pixel_sum = 0
		// Brute force
		for (var index = 0; index < sprite_image.length; index += 4){
			
			for (var offset = 0; offset < 4; offset++) {
				pixel_sum += overlap_image[index + offset]
			}
			
			if (pixel_sum > 0) {
				return true
			}
			else {
				pixel_sum = 0
			}
		}

		return false
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

	Update(reference_to_scene) {
		super.Update(reference_to_scene)
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
	constructor(scene_canvas, map_canvas) {
		this.ctx = scene_canvas.getContext("2d")
		this.map = new Map(map_canvas)
		this.map_ctx = map_canvas.getContext("2d")

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

	// This should be a method of the baseEnt class
	drawActor(actor_to_draw) {
		actor_to_draw.Draw(this)
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
			this.actor_list[index].Update(this)
		}
	}

	// Draw everything in current scene
	drawScene() {
		// ********DEBUG CODE********
		this.map_ctx.clearRect(0, 0, this.map_ctx.canvas.width, this.map_ctx.canvas.height)
		this.map_ctx.fillStyle = "black"
		this.map_ctx.fillRect(500, 0, 30, 600)

		// ********DEBUG CODE********

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
		return this.ctx.getImageData(x_pos, y_pos, width, height)
	}
}