import type { ICommand } from '@ostro/contracts/console/command';

const Argument = require('./argument');
const Option = require('./option');
const CommandContracts = require('@ostro/contracts/console/command');
const { implement } = require('@ostro/support/function');
const Interaction = require('./concerns/intraction');
const HasParameters = require('./concerns/hasParameters');
const CallCommands = require('./concerns/callsCommands');

/**
 * Class Command.
 */
class Command extends implement(CommandContracts, Interaction, CallCommands, HasParameters) implements ICommand {
    $app: any;
    $console: any;

    get $signature() {
        throw Error('$signature must be defined')
    }

    get $description() {
        throw Error('$description must be defined')
    }

    get $options() {
        return []
    }

    get $arguments() {
        return []
    }

    /**
     * createArgument method.
     * @returns {any}
     */
    createArgument() {
        return new Argument(...arguments)
    }

    /**
     * createOption method.
     * @returns {any}
     */
    createOption() {
        return new Option(...arguments)
    }

    /**
     * getApp method.
     * @returns {any}
     */
    getApp() {
        return this.$app;
    }

    /**
     * setApp method.
     * @param {*} $app
     * @returns {any}
     */
    setApp($app: any) {
        this.$app = $app;
    }

    /**
     * setConsole method.
     * @param {*} $console
     * @returns {any}
     */
    setConsole($console: any) {
        this.$console = $console
    }

    /**
     * getConsole method.
     * @returns {any}
     */
    getConsole() {
        return this.$console
    }

    /**
     * execute method.
     * @returns {any}
     */
    execute() {
        let $method = typeof this['handle'] == 'function' ? 'handle' : '__invoke';
        return this.$app.call(this, $method);
    }
    /**
     * __invoke method.
     * @returns {any}
     */
    __invoke() {
        throw Error('class should have either handle or __invike function')
    }
}

module.exports = Command