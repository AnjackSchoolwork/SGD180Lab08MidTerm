class baseItem {

	constructor() {

	}

	passiveEffect() {
		
	}
	
	activeEffect() {
		
	}
}

class baseEnt {

	constructor() {
		this.health = 100
		this.inventory = {}
		this.position = {
			"x": 0,
			"y": 0
		}
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

	Update() {

	}
}

class baseMob extends baseEnt {

	Update() {
		super.Update()
	}

	Move() {

	}
}

class Player extends baseEnt {

	Update() {
		super.Update()
	}

	Control() {

	}
}

class Sprite {

}