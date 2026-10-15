const commander = require('commander')

/**
 * Class Argument.
 */
class Argument{
	/**
	 * Create a new instance.
	 */
	constructor(){
		this.$handler = new commander.Argument(...arguments);
		this.$handler.argOptional()
	}
	/**
	 * choices method.
	 * @returns {any}
	 */
	choices(){
		this.$handler.choices(...arguments)
		return this
	}
	/**
	 * default method.
	 * @returns {any}
	 */
	default(){
		this.$handler.default(...arguments)
		return this
	}
	/**
	 * required method.
	 * @returns {any}
	 */
	required(){
		this.$handler.argRequired()
		return this
	}
}

module.exports = Argument