const CommandNotFoundExceptionContract = require('@ostro/contracts/console/commandNotFoundException')
/**
 * Class CommandNotFoundException.
 */
class CommandNotFoundException extends CommandNotFoundExceptionContract{
   
    /**
     * Create a new instance.
     * @param {*} message
     */
    constructor(message) {
        super();
        this.name = this.constructor.name;
        this.message =  message;
        this.status =  500;
        Error.captureStackTrace(this, this.constructor);      
    }

}

module.exports = CommandNotFoundException