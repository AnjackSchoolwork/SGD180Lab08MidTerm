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

	constructor() {
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
			"x": 0,
			"y": 0
		}

		// Empty sprite by default
		this.image = new Sprite()
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

	get Image() {
		return this.image
	}

	set Image(new_image) {
		// TODO: Validation
		this.image = new_image
	}

	// Redraw sprites, update positions
	Update() {

	}
}

// Mob is a type of entity
class baseMob extends baseEnt {

	Update() {
		super.Update()
	}

	Move() {

	}
}

// Player is a type of mob
class Player extends baseEnt {

	Update() {
		super.Update()
	}

	Control() {

	}
}

class Sprite {

	constructor() {

	}

	Update() {

	}
}