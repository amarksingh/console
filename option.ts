const commander = require('commander')
/**
 * Class Option.
 */
class Option{
	/**
	 * Create a new instance.
	 */
	constructor(){
		this.$handler = new commander.Option(...arguments);
	}
	/**
	 * hideHelp method.
	 * @returns {any}
	 */
	hideHelp(){
		this.$handler.hideHelp(...arguments)
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
	 * choices method.
	 * @returns {any}
	 */
	choices(){
		this.$handler.choices(...arguments)	
		return this
	}
	/**
	 * required method.
	 * @returns {any}
	 */
	required(){
		this.$handler.makeOptionMandatory()
		return this
	}
}
module.exports = Option