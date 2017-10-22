// All items inherit from this.
function baseItem() {
	this.passiveEffect = function(calling_entity, delta_time) {
		
	}
	this.activeEffect = function(calling_entity, delta_time) {
		
	}
}

// All entities inherit from this.
function baseEnt() {
	
	// TODO:
	// Add constructors
	
	// Percentage-based health?
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
	
	// Default empty sprite
	// TODO:
	// Add constructor for adding sprite at time of creation
	this.image = new Sprite()
	
	// Redraw sprites, update positions
	this.Update = function(delta_time) {
		
	}
}

function baseMob() {
	// Inherit from baseEnt
	baseEnt.call(this)
	
	// 
	this.Move = function() {
		
	}
	
}

// *****
// Pulls physics objects toward itself. Objects re-orient with
// strongest gravityWell.
// *****
function gravityWell() {
	// Represents maximum force of gravity at center of well
	this.max_force = 10.0
	// Represents the rate at which gravitational pull decreases
	// as objects move away from center
	this.fall_off = 1.0
}

// Object to contain & draw sprite image
// Should have a draw function
function Sprite() {
	
}